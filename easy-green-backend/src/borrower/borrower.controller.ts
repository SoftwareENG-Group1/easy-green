import { Body, Controller, Param, Post } from '@nestjs/common';
import { BorrowerService } from './borrower.service';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { Borrower } from './entity/borrower.entity';

@Controller('borrower')
export class BorrowerController {
    constructor(private readonly borrowerService: BorrowerService) { }

    @Post(':userId')
    async createBorrower(
        @Param('userId') userId: number,
        @Body() createBorrowerDto: CreateBorrowerDto,
      ): Promise<Borrower> {
        return this.borrowerService.create(createBorrowerDto, userId);
      }
}
