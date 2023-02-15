import { Test, TestingModule } from '@nestjs/testing';
import { IncomingMailService } from './incoming-mail.service';

describe('InomingMailService', () => {
  let service: IncomingMailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncomingMailService],
    }).compile();

    service = module.get<IncomingMailService>(IncomingMailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
