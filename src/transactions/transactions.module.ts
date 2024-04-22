// src/transactions/transactions.module.ts
import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Module({
  providers: [TransactionsService],
  exports: [TransactionsService], // Export TransactionsService here
})
export class TransactionsModule {}

