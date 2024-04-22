import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { availableCurrencies } from '../currencies';

@Injectable()
export class ForexSyncService {
  private readonly logger = new Logger(ForexSyncService.name);
  private rates: any = {};
  private readonly apiKey = 'mnwKKZfNkR-IYY5DWyXp'; // API key

  @Cron(CronExpression.EVERY_30_SECONDS)
  async syncRates() {
    this.logger.log('Syncing FX rates...');
    try {
      const baseCurrency = 'USD';
      for (const currency of availableCurrencies) {
        const currencyPair = `${baseCurrency}${currency}`;
        const response = await axios.get(`https://marketdata.tradermade.com/api/v1/live?currency=${currencyPair}&api_key=${this.apiKey}`);
        this.rates[currency] = response.data.quotes[0].mid;
      }
      
      this.logger.log('FX rates synced successfully');
    } catch (error) {
      this.logger.error('Error syncing FX rates', error.response.data);
    }
    this.logger.log('Syncing completed');
  }

  getRates() {
    return this.rates;
  }
}

