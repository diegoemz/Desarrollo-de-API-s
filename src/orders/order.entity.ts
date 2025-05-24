import { ClientEntity } from "src/clients/client.entity";
import { Product } from "src/products/product.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, JoinTable } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ClientEntity, client => client.orders, { eager: true, onDelete: 'CASCADE' })
    client: ClientEntity;

    @ManyToMany(() => Product, { eager: true })
    @JoinTable()
    products: Product[];

    @CreateDateColumn()
    createdAt: Date;

    @Column('decimal', { precision: 10, scale: 2 })
    totalAmount: number;
}
