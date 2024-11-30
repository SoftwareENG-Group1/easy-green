import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyContributionsService } from './monthly-contributions.service';

describe('MonthlyContributionsService', () => {
  let service: MonthlyContributionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonthlyContributionsService],
    }).compile();

    service = module.get<MonthlyContributionsService>(MonthlyContributionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
