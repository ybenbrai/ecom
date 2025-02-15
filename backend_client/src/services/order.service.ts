import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/entities/order.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createOrder(
    userId: number,
    productId: number,
    status: string,
    totalPrice: number,
  ): Promise<Order> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!user || !product) {
      throw new Error('User or product not found');
    }

    const order = this.orderRepository.create({
      user,
      product,
      status,
      totalPrice,
    });
    return this.orderRepository.save(order);
  }

  async getOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async getOrder(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }

  async updateOrder(id: number, updateData: Partial<Order>): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new Error('Order not found');
    }
    this.orderRepository.merge(order, updateData);
    return this.orderRepository.save(order);
  }

  async deleteOrder(id: number): Promise<{ message: string }> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new Error('Order not found');
    }
    await this.orderRepository.remove(order);
    return { message: 'Order deleted' };
  }
}
