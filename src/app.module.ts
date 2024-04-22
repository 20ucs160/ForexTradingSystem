// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ForexModule } from './forex/forex.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [ForexModule, TransactionsModule, AccountsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


