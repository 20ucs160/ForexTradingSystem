import { Injectable } from '@nestjs/common';
import { TransactionsService } from '../transactions/transactions.service';

@Injectable()
export class ForexService {
  constructor(private readonly transactionsService: TransactionsService) {}

  async calculateBalance(currency: string): Promise<number> {
    let balance = 0;
    for (const transaction of this.transactionsService.transactions) {
      if (transaction.currency === currency) {
        balance += transaction.amount;
      }
    }
    return balance;
  }  
}




