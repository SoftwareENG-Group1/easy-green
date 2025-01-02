import { forwardRef, Module } from '@nestjs/common';
import { MonthlyPaymentsController } from './monthly-payments.controller';
import { MonthlyPaymentsService } from './monthly-payments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthlyPayment } from './entity/monthly-payments.entity';
import { LoanModule } from 'src/loan/loan.module';

@Module({
  imports: [TypeOrmModule.forFeature([MonthlyPayment]), 
  forwardRef(() => LoanModule)],
  controllers: [MonthlyPaymentsController],
  providers: [MonthlyPaymentsService],
  exports: [MonthlyPaymentsService, TypeOrmModule]
})
export class MonthlyPaymentsModule {}
