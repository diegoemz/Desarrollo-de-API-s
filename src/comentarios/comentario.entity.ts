import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "src/products/product.entity";
import { IsInt, Min, Max, Length } from "class-validator";

@Entity()
export class Comentario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  @Length(1, 200, { message: 'El comentario debe tener máximo 200 caracteres' })
  texto: string;

  @Column()
  @IsInt({ message: 'El puntaje debe ser un número entero' })
  @Min(1, { message: 'El puntaje mínimo es 1' })
  @Max(5, { message: 'El puntaje máximo es 5' })
  puntaje: number;

  @ManyToOne(() => Product, product => product.comentarios, { eager: true })
  product: Product;
}
