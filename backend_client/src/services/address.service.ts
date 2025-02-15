import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from 'src/entities/address.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a new address
  async create(
    userId: number,
    addressData: Partial<Address>,
  ): Promise<Address> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const address = this.addressRepository.create({ ...addressData, user });
    return this.addressRepository.save(address);
  }

  // Find all addresses
  async findAll(): Promise<Address[]> {
    return this.addressRepository.find({ relations: ['user'] });
  }

  // Find one address by ID
  async findOne(id: number): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!address) {
      throw new Error('Address not found');
    }
    return address;
  }

  // Update an address
  async update(id: number, addressData: Partial<Address>): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!address) {
      throw new Error('Address not found');
    }

    this.addressRepository.merge(address, addressData);
    return this.addressRepository.save(address);
  }

  // Delete an address
  async delete(id: number): Promise<void> {
    const address = await this.addressRepository.findOne({
      where: { id },
    });
    if (!address) {
      throw new Error('Address not found');
    }

    await this.addressRepository.remove(address);
  }
}
