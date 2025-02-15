import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AddressService } from 'src/services/address.service';
import { Address } from 'src/entities/address.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  // Create a new address for a user
  @Post(':userId')
  async create(
    @Param('userId') userId: number,
    @Body() addressData: Partial<Address>,
  ) {
    try {
      const address = await this.addressService.create(userId, addressData);
      return { message: 'Address created successfully', address };
    } catch (error) {
      throw new HttpException(
        'Failed to create address',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Get all addresses
  @Get()
  async findAll() {
    try {
      const addresses = await this.addressService.findAll();
      return addresses;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch addresses',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Get a single address by ID
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const address = await this.addressService.findOne(id);
      if (!address) {
        throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
      }
      return address;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch address',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Update an existing address
  @Put(':id')
  async update(@Param('id') id: number, @Body() addressData: Partial<Address>) {
    try {
      const updatedAddress = await this.addressService.update(id, addressData);
      if (!updatedAddress) {
        throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Address updated successfully', updatedAddress };
    } catch (error) {
      throw new HttpException(
        'Failed to update address',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Delete an address
  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      const result = await this.addressService.delete(id);
      if (result === undefined) {
        throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Address deleted successfully' };
    } catch (error) {
      throw new HttpException(
        'Failed to delete address',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
