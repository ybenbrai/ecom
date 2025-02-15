import { Cart } from 'src/entities/cart.entity';
import { Order } from 'src/entities/order.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql', // or your database type
  host: 'localhost',
  username: 'test',
  password: 'test',
  database: 'test',
  synchronize: true,
  entities: [User, Product, Cart, Order], // your entities here
});
