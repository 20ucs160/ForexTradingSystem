// src/accounts/accounts.controller.ts
import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { TransactionsService } from '../transactions/transactions.service';
import { ForexService } from '../forex/forex.service';
import { availableCurrencies } from '../currencies';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly forexService: ForexService,
  ) {}

  @Post('topup')
  async topUpAccount(@Body() body: { currency: string; amount: number }) {
    const { currency, amount } = body;

      if (!currency || typeof currency !== 'string' || !availableCurrencies.includes(currency)) {
        throw new HttpException('Invalid currency', HttpStatus.BAD_REQUEST);
      }
  
      // Validate amount
      // If amount is not provided or is not a number, or is not a positive number, throw an error
      if (!amount || typeof amount !== 'number' || amount <= 0) {
        throw new HttpException('Invalid amount', HttpStatus.BAD_REQUEST);
      }

    // Validate amount
    // If amount is not provided or is not a positive number, throw an error
    if (isNaN(amount) || amount <= 0) {
      throw new HttpException('Invalid amount', HttpStatus.BAD_REQUEST);
    }

    // Add the amount to the user's account
    this.transactionsService.transactions.push({ currency, amount });

    return { message: `Successfully topped up ${amount} ${currency}` };
  }

  @Get('balance')
  async getAccountBalance() {
    const balances = {};

    // Calculate balance for each currency
    for (const transaction of this.transactionsService.transactions) {
      const { currency, amount } = transaction;
      if (!balances[currency]) {
        balances[currency] = 0;
      }
      balances[currency] += amount;
    }

    return { balances };
  }
}
