import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AppDataSource } from './data-source'; // Import DataSource instance
import { Order } from 'src/entities/order.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';

@Controller('orders') // Define the base route for this controller
export class OrderController {
  @Post() // POST route to create an order
  async createOrder(@Body() body: any) {
    const orderRepository = AppDataSource.getRepository(Order);
    const productRepository = AppDataSource.getRepository(Product);
    const { userId, productId, status, totalPrice } = body;
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: userId },
    });
    const product = await productRepository.findOne({
      where: { id: productId },
    });
    if (!user || !product) {
      throw new Error('User or product not found');
    }
    const order = orderRepository.create({ user, product, status, totalPrice });
    await orderRepository.save(order);
    return order;
  }

  @Get() // GET route to fetch all orders
  async getOrders() {
    const orderRepository = AppDataSource.getRepository(Order);
    const orders = await orderRepository.find();
    return orders;
  }

  @Get(':id') // GET route to fetch a single order by ID
  async getOrder(@Param('id') id: string) {
    const orderRepository = AppDataSource.getRepository(Order);
    const order = await orderRepository.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }

  @Put(':id') // PUT route to update an order
  async updateOrder(@Param('id') id: string, @Body() body: any) {
    const orderRepository = AppDataSource.getRepository(Order);
    const order = await orderRepository.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (!order) {
      throw new Error('Order not found');
    }
    orderRepository.merge(order, body);
    await orderRepository.save(order);
    return order;
  }

  @Delete(':id') // DELETE route to remove an order
  async deleteOrder(@Param('id') id: string) {
    const orderRepository = AppDataSource.getRepository(Order);
    const order = await orderRepository.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (!order) {
      throw new Error('Order not found');
    }
    await orderRepository.remove(order);
    return { message: 'Order deleted' };
  }
}
