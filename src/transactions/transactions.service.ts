// src/transactions/transactions.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsService {
  transactions: { currency: string; amount: number }[] = [];
}
