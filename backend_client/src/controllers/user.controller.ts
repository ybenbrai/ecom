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
  UseGuards,
  Request,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'; // Import bcrypt
import { CreateUserDto } from 'src/dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  @UseGuards(JwtAuthGuard) // Protect this route
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // Return the authenticated user
  }

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    const { name, email, password } = body;

    // Check if user with the same email already exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Hash the password before saving
    const saltRounds = 10; // Number of salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save the user
    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword, // Use the hashed password
    });
    await this.userRepository.save(user);
    return user;
  }

  @Get()
  async getUsers() {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch {
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

    // Hash the new password if it's provided in the update
    if (body.password) {
      const saltRounds = 10;
      body.password = await bcrypt.hash(body.password, saltRounds);
    }

    // Merge and save the updated user
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
