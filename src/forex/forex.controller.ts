// src/forex/forex.controller.ts
import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TransactionsService } from '../transactions/transactions.service';
import { ForexService } from './forex.service';
import { ForexSyncService } from './forex-sync.service';

@Controller('fx-rates')
export class ForexController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly forexService: ForexService,
    private readonly forexSyncService: ForexSyncService,
  ) {
    // Initialize rates sync
    this.forexSyncService.syncRates();
  }

  @Get()
  async getFxRates() {
    const rates = this.forexSyncService.getRates();
    const quoteId = uuidv4();
    const expiryAt = Date.now() + 30 * 1000; // 30 seconds expiry
    return { quoteId, expiry_at: expiryAt, rates};
  }

  @Post('conversion')
  async convertFx(@Body() body: { quoteId: string; fromCurrency: string; toCurrency: string; amount: number }) {
    const { quoteId, fromCurrency, toCurrency, amount } = body;
    
    // Validate quoteId
    // If quoteId is not provided or is invalid, throw an error
    if (!quoteId || typeof quoteId !== 'string') {
      throw new HttpException('Invalid quoteId', HttpStatus.BAD_REQUEST);
    }

    // Validate fromCurrency and toCurrency
    // If either of them is not provided or is invalid, throw an error
    if (!fromCurrency || !toCurrency || typeof fromCurrency !== 'string' || typeof toCurrency !== 'string') {
      throw new HttpException('Invalid currency', HttpStatus.BAD_REQUEST);
    }

    // Validate amount
    // If amount is not provided or is not a positive number, throw an error
    if (isNaN(amount) || amount <= 0) {
      throw new HttpException('Invalid amount', HttpStatus.BAD_REQUEST);
    }

    // Check if the user has the currency for conversion
    const hasCurrency = this.transactionsService.transactions.some(transaction => transaction.currency === fromCurrency);
    if (!hasCurrency) {
      throw new HttpException('Currency not found for conversion', HttpStatus.BAD_REQUEST);
    }

    // Check if the user has sufficient balance for conversion
    const balance = await this.forexService.calculateBalance(fromCurrency);
    if (balance < amount) {
      throw new HttpException('Insufficient balance for conversion', HttpStatus.BAD_REQUEST);
    }

    // Fetch rates from memory
    const rates = this.forexSyncService.getRates();

    // Check if the rates for the given currencies exist
    if (!rates[fromCurrency] || !rates[toCurrency]) {
      throw new HttpException('Conversion rate not found', HttpStatus.BAD_REQUEST);
    }

    // Convert currency
    const conversionRate = rates[toCurrency]/rates[fromCurrency]; 
    const convertedAmount = amount * conversionRate;
    
    // Deduct the converted amount from the original currency
    const originalCurrencyAmount = -1 * amount;
    this.transactionsService.transactions.push({ currency: fromCurrency, amount: originalCurrencyAmount });
    
    // Add the converted amount to the target currency
    this.transactionsService.transactions.push({ currency: toCurrency, amount: convertedAmount });
    
    return { convertedAmount, currency: toCurrency };
  }
}




