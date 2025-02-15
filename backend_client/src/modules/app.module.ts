import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './product.module';
import { CartModule } from './cart.module';
import { OrderModule } from './order.module';
import { AddressModule } from './address.module';
import { PaymentModule } from './payment.module';
import { ProductImageModule } from './product-image.module';
import { User } from 'src/entities/user.entity';
import { Product } from 'src/entities/product.entity';
import { Cart } from 'src/entities/cart.entity';
import { Order } from 'src/entities/order.entity';
import { Address } from 'src/entities/address.entity';
import { ProductImage } from 'src/entities/product-image.entity';
import { Payment } from 'src/entities/payment.entity';
import { NewsModule } from './news.module';
import { News } from 'src/entities/news.entity';
import { AuthModule } from './auth.module'; // Import AuthModule
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { UsersModule } from './user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [
          User,
          Product,
          Cart,
          Order,
          Address,
          Payment,
          ProductImage,
          News,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule, // Import AuthModule
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
    ProductModule,
    CartModule,
    OrderModule,
    AddressModule,
    PaymentModule,
    ProductImageModule,
    NewsModule,
  ],
})
export class AppModule {}
