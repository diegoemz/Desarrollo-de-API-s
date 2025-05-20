import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export class ClientEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsNotEmpty({message: 'El nombre no puede estar vacio'})
    nombre:string;

    @Column({unique:true})
    @IsEmail({}, {message: ' El formato del email no es valido'})
    @IsNotEmpty({message: 'El email es requerido'})
    email: string;

    @OneToMany(()=> Product, product => product.client)
    products: Product[];
}
