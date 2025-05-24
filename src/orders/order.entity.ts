import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Column,
} from 'typeorm';
import { ClientEntity } from 'src/clients/client.entity';
import { Product } from 'src/products/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => ClientEntity, (client) => client.orders)
  client: ClientEntity;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;
}
