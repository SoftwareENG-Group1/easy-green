import { PartialType } from '@nestjs/mapped-types';
import { CreateMonthlyPaymentsDto } from './create-monthly-payments.dto';


export class UpdateMonthlyPaymentsDto extends PartialType(CreateMonthlyPaymentsDto) {
  
}