import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { IncomingMail } from './incoming-mail.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class IncomingMailService {
  constructor(
    @InjectRepository(IncomingMail)
    private readonly incomingMailRepository: Repository<IncomingMail>,
    private readonly entityManager: EntityManager,
  ) {}

  async generateRandomMail(): Promise<void> {
    const count = Math.floor(Math.random() * 3) + 1;
    const mails = Array.from({ length: count }, () => {
      const incomingMail = new IncomingMail();
      incomingMail.sender = faker.name.firstName();
      incomingMail.title = faker.lorem.words(3);
      incomingMail.text = faker.lorem.sentences(5);
      incomingMail.createdAt = new Date();
      return incomingMail;
    });
    await this.incomingMailRepository.save(mails);
  }

  async getAll(): Promise<IncomingMail[]> {
    await this.generateRandomMail();
    return this.incomingMailRepository.find();
  }

  async deleteAll(): Promise<void> {
    await this.entityManager.delete(IncomingMail, {});
  }
}
