// src/forex/forex.module.ts
import { Module } from '@nestjs/common';
import { ForexController } from './forex.controller';
import { TransactionsModule } from '../transactions/transactions.module';
import { ForexService } from './forex.service';
import { ForexSyncService } from './forex-sync.service';

@Module({
  imports: [TransactionsModule],
  controllers: [ForexController],
  providers: [ForexService, ForexSyncService],
})
export class ForexModule {}

