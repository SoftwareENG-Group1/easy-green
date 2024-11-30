import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyContributionsController } from './monthly-contributions.controller';

describe('MonthlyContributionsController', () => {
  let controller: MonthlyContributionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonthlyContributionsController],
    }).compile();

    controller = module.get<MonthlyContributionsController>(MonthlyContributionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
