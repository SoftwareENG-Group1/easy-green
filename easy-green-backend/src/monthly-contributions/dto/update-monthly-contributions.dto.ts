import { PartialType } from '@nestjs/swagger';
import { CreateMonthlyContributionsDto } from './create-monthly-contributions.dto';

export class UpdateMonthlyContributionsDto extends PartialType(CreateMonthlyContributionsDto) {
}