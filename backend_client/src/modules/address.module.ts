import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/entities/address.entity';
import { User } from 'src/entities/user.entity';
import { AddressController } from 'src/controllers/address.controller';
import { AddressService } from 'src/services/address.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address, User])], // Import the Address and User entities
  controllers: [AddressController], // Register the controller
  providers: [AddressService], // Register the service
})
export class AddressModule {}
