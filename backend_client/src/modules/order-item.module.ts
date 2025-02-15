import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemService } from 'src/services/order-item.service';
import { OrderItemController } from 'src/controllers/order-item.controller';
import { OrderItem } from 'src/entities/order-item.entity';
import { OrderModule } from './order.module'; // Import OrderModule
import { ProductModule } from './product.module'; // Import ProductModule

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem]), OrderModule, ProductModule],
  providers: [OrderItemService],
  controllers: [OrderItemController],
})
export class OrderItemModule {}
