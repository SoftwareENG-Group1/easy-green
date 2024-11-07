import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyPaymentsController } from './monthly-payments.controller';

describe('MonthlyPaymentsController', () => {
  let controller: MonthlyPaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonthlyPaymentsController],
    }).compile();

    controller = module.get<MonthlyPaymentsController>(MonthlyPaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
