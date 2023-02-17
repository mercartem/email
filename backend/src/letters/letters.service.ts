import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateLetterDto } from './dto/create-letter.dto';
import { Letter } from './letters.entity';

@Injectable()
export class LettersService {
  constructor(
    @InjectRepository(Letter)
    private readonly letterRepository: Repository<Letter>,
    private readonly entityManager: EntityManager,
  ) {}

  async getAll(): Promise<Letter[]> {
    return this.letterRepository.find();
  }

  async create(letterDto: CreateLetterDto): Promise<Letter> {
    const letter = new Letter();
    letter.title = letterDto.title;
    letter.text = letterDto.text;
    letter.createdAt = new Date();
    await this.letterRepository.save(letter);
    return letter;
  }

  async deleteAll(): Promise<void> {
    await this.entityManager.delete(Letter, {});
  }
}
