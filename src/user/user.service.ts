import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(email: string, password: string): Promise<User> {
    const user = this.userRepository.create({ email, password });
    return this.userRepository.save(user);
  }

  async findUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } }); // Передаем объект с опциями
  }

  async findUserColumns(userId: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: ['boardColumns']
    });
  }

  async deleteUserColumn(userId: number, columnId: number): Promise<void> {
    const user = await this.findUserById(userId);
    user.boardColumns = user.boardColumns.filter(column => column.id !== columnId);
    await this.userRepository.save(user);
  }
}
