import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LettersModule } from './letters/letters.module';
import { IncomingMailController } from './incoming-mail/incoming-mail.controller';
import { IncomingMailService } from './incoming-mail/incoming-mail.service';
import { IncomingMailModule } from './incoming-mail/incoming-mail.module';
import { Letter } from './letters/letters.entity';
import { IncomingMail } from './incoming-mail/incoming-mail.entity';

@Module({
  imports: [
    LettersModule,
    IncomingMailModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'path/to/database/file.db',
      entities: [Letter, IncomingMail],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([IncomingMail]),
    TypeOrmModule.forFeature([Letter]),
  ],
  controllers: [AppController, IncomingMailController],
  providers: [AppService, IncomingMailService],
})
export class AppModule {}
