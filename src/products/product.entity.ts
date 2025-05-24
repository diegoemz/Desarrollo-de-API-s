import { ClientEntity } from "src/clients/client.entity";
import { Comentario } from "src/comentarios/comentario.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column('decimal', { precision: 10, scale: 2 })
    precio: number;

    @Column()
    stock: number;

    @ManyToOne(() => ClientEntity, client => client.products)
    client: ClientEntity;

    @OneToMany(() => Comentario, comentario => comentario.product)
    comentarios: Comentario[];
}