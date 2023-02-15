import { Module } from '@nestjs/common/decorators';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LettersController } from './letters.controller';
import { Letter } from './letters.entity';
import { LettersService } from './letters.service';

@Module({
  imports: [TypeOrmModule.forFeature([Letter])],
  providers: [LettersService],
  controllers: [LettersController],
})
export class LettersModule {}
