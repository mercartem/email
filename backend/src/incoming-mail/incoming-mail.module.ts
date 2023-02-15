import { Module } from '@nestjs/common/decorators';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomingMailController } from './incoming-mail.controller';
import { IncomingMail } from './incoming-mail.entity';
import { IncomingMailService } from './incoming-mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([IncomingMail])],
  providers: [IncomingMailService],
  controllers: [IncomingMailController],
})
export class IncomingMailModule {}
