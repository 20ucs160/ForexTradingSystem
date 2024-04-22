// src/accounts/accounts.module.ts
import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { TransactionsModule } from '../transactions/transactions.module';
import { ForexModule } from '../forex/forex.module';
import { ForexService } from '../forex/forex.service'; // Import ForexService

@Module({
  imports: [TransactionsModule, ForexModule],
  controllers: [AccountsController],
  providers: [ForexService], // Add ForexService to providers array
})
export class AccountsModule {}
