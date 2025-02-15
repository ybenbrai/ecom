import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;
  @Column({ length: 3, default: 'MAD' })
  currency: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ length: 255, default: 'https://picsum.photos/128/128' })
  image: string;
}
