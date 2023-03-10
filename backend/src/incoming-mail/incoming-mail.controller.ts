import { Controller, Delete, Get } from '@nestjs/common';
import { IncomingMailService } from './incoming-mail.service';

@Controller('incoming-mail')
export class IncomingMailController {
  constructor(private readonly incomingMailService: IncomingMailService) {}

  @Get()
  getRandom() {
    return this.incomingMailService.getAll();
  }

  @Delete()
  deleteAll() {
    return this.incomingMailService.deleteAll();
  }
}
