import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from 'src/entities/order-item.entity';
import { CreateOrderItemDto } from 'src/dto/create-order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    const orderItem = this.orderItemRepository.create(createOrderItemDto);
    return await this.orderItemRepository.save(orderItem);
  }

  async findAll(): Promise<OrderItem[]> {
    return await this.orderItemRepository.find();
  }

  async findOne(id: number): Promise<OrderItem> {
    return await this.orderItemRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateOrderItemDto: CreateOrderItemDto,
  ): Promise<OrderItem> {
    await this.orderItemRepository.update(id, updateOrderItemDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.orderItemRepository.delete(id);
  }
}
