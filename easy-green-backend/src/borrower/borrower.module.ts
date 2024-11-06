import { Module } from '@nestjs/common';
import { BorrowerController } from './borrower.controller';
import { BorrowerService } from './borrower.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrower } from './entity/borrower.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Borrower])],
  controllers: [BorrowerController],
  providers: [BorrowerService]
})
export class BorrowerModule {}
