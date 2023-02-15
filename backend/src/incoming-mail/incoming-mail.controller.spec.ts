import { Test, TestingModule } from '@nestjs/testing';
import { IncomingMailController } from './incoming-mail.controller';

describe('IncomingMailController', () => {
  let controller: IncomingMailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncomingMailController],
    }).compile();

    controller = module.get<IncomingMailController>(IncomingMailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
