import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from 'src/entities/cart.entity';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createCart(userId: number): Promise<Cart> {
    const cart = this.cartRepository.create({ user: { id: userId } });
    return this.cartRepository.save(cart);
  }

  async addToCart(cartId: number, productId: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['products'],
    });
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!cart || !product) {
      throw new Error('Cart or product not found');
    }
    cart.products.push(product);
    return this.cartRepository.save(cart);
  }

  async getCart(id: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!cart) {
      throw new Error('Cart not found');
    }
    return cart;
  }

  async updateCart(id: number, updateData: Partial<Cart>): Promise<Cart> {
    const cart = await this.cartRepository.findOne({ where: { id } });
    if (!cart) {
      throw new Error('Cart not found');
    }
    this.cartRepository.merge(cart, updateData);
    return this.cartRepository.save(cart);
  }

  async deleteCart(id: number): Promise<{ message: string }> {
    const cart = await this.cartRepository.findOne({ where: { id } });
    if (!cart) {
      throw new Error('Cart not found');
    }
    await this.cartRepository.remove(cart);
    return { message: 'Cart deleted' };
  }
}
