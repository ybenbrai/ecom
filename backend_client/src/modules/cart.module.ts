import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/entities/cart.entity';
import { CartService } from 'src/services/cart.service'; // Assuming CartService exists
import { CartController } from 'src/controllers/cart.controller'; // Assuming CartController exists
import { ProductModule } from './product.module'; // Import ProductModule to access ProductRepository

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), ProductModule], // Import ProductModule
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
