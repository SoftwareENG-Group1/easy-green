import { Module } from '@nestjs/common';
import { MonthlyPaymentsController } from './monthly-payments.controller';
import { MonthlyPaymentsService } from './monthly-payments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthlyPayment } from './entity/monthly-payments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MonthlyPayment])],
  controllers: [MonthlyPaymentsController],
  providers: [MonthlyPaymentsService]
})
export class MonthlyPaymentsModule {}
