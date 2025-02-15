import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { AppDataSource } from './data-source';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('users')
export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Post()
  async createUser(@Body() body: any) {
    const { name, email, password } = body;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = this.userRepository.create({ name, email, password });
    await this.userRepository.save(user);
    return user;
  }

  @Get()
  async getUsers() {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() body: any) {
    const user = await this.userRepository.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    this.userRepository.merge(user, body);
    await this.userRepository.save(user);
    return user;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.remove(user);
    return { message: 'User deleted' };
  }
}
