 /* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getDatabaseConfig } from './database.config';
import { UserModule } from './user/user.module';
import { BorrowerModule } from './borrower/borrower.module';
import { LoanModule } from './loan/loan.module';
import { MonthlyPaymentsModule } from './monthly-payments/monthly-payments.module';
import { AuthModule } from './auth/auth.module';
import { ContributionsModule } from './contributions/contributions.module';
import { MonthlyContributionsModule } from './monthly-contributions/monthly-contributions.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory:getDatabaseConfig
    }),
    UserModule,
    BorrowerModule,
    LoanModule,
    MonthlyPaymentsModule,
    AuthModule,
    ContributionsModule,
    MonthlyContributionsModule,
    TransactionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
