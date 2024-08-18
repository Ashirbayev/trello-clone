import { Injectable } from '@nestjs/common';
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

const scryptAsync = promisify(scrypt);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string): Promise<User> {
    if (!password) {
      throw new Error('Password cannot be undefined or empty');
    }
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = await this.hashPassword(password, salt);
    const user = this.userRepository.create({ email, password: hashedPassword });
    return this.userRepository.save(user);
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    if (!password || !salt) {
      throw new Error('Password and salt cannot be undefined or empty');
    }
    const key = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${salt}:${key.toString('hex')}`;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      const [salt, storedHash] = user.password.split(':');
      const hashedPassword = await this.hashPassword(password, salt);
      if (storedHash === hashedPassword.split(':')[1]) {
        return user;
      }
    }
    return null;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
