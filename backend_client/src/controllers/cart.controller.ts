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
import { Cart } from 'src/entities/cart.entity';
import { Product } from 'src/entities/product.entity';

@Controller('carts') // Define the base route for this controller
export class CartController {
  @Post() // POST route to create a cart
  async createCart(@Body() body: any) {
    const cartRepository = AppDataSource.getRepository(Cart);
    const { userId } = body;
    const cart = cartRepository.create({ user: { id: userId } });
    await cartRepository.save(cart);
    return cart;
  }

  @Post(':cartId/products') // POST route to add a product to a cart
  async addToCart(@Param('cartId') cartId: string, @Body() body: any) {
    const cartRepository = AppDataSource.getRepository(Cart);
    const productRepository = AppDataSource.getRepository(Product);
    const { productId } = body;
    const cart = await cartRepository.findOne({
      where: { id: parseInt(cartId, 10) },
      relations: ['products'],
    });
    const product = await productRepository.findOne({
      where: { id: parseInt(productId, 10) },
    });
    if (!cart || !product) {
      throw new Error('Cart or product not found');
    }
    cart.products.push(product);
    await cartRepository.save(cart);
    return cart;
  }

  @Get(':id') // GET route to fetch a single cart by ID
  async getCart(@Param('id') id: string) {
    const cartRepository = AppDataSource.getRepository(Cart);
    const cart = await cartRepository.findOne({
      where: { id: parseInt(id, 10) },
      relations: ['products'],
    });
    if (!cart) {
      throw new Error('Cart not found');
    }
    return cart;
  }

  @Put(':id') // PUT route to update a cart
  async updateCart(@Param('id') id: string, @Body() body: any) {
    const cartRepository = AppDataSource.getRepository(Cart);
    const cart = await cartRepository.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (!cart) {
      throw new Error('Cart not found');
    }
    cartRepository.merge(cart, body);
    await cartRepository.save(cart);
    return cart;
  }

  @Delete(':id') // DELETE route to remove a cart
  async deleteCart(@Param('id') id: string) {
    const cartRepository = AppDataSource.getRepository(Cart);
    const cart = await cartRepository.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (!cart) {
      throw new Error('Cart not found');
    }
    await cartRepository.remove(cart);
    return { message: 'Cart deleted' };
  }
}
