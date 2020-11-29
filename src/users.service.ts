
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      order: {
        score: "DESC"
      }
    });
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async insert(user: User): Promise<User> {
    let result = await this.usersRepository.insert(user);
    return {
        ...user,
        id: result.identifiers[0].id,
    };
  }

  async update(user: User): Promise<void> {
    await this.usersRepository.update(user.id, user);
  }

}