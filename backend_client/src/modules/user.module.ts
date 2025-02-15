import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/services/user.service';
import { UserController } from 'src/controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService], // Ensure UsersService is in providers
  controllers: [UserController],
  exports: [UsersService], // Make sure it's exported to be used by other modules
})
export class UsersModule {}
