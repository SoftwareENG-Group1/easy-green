import { Module } from '@nestjs/common';
import { BorrowerController } from './borrower.controller';
import { BorrowerService } from './borrower.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrower } from './entity/borrower.entity';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Borrower]), 
  UserModule],
  controllers: [BorrowerController],
  providers: [BorrowerService]
})
export class BorrowerModule {}
