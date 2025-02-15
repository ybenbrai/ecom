// order.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from 'src/services/order.service';
import { OrderController } from 'src/controllers/order.controller';
import { Order } from 'src/entities/order.entity';
import { User } from 'src/entities/user.entity';
import { ProductModule } from './product.module'; // Import ProductModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, User]), // Make sure OrderRepository and UserRepository are available
    ProductModule, // Import ProductModule to access ProductRepository
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
