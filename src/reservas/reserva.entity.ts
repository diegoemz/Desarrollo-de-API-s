import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, Unique } from "typeorm";
import { ClientEntity } from "src/clients/client.entity";

@Entity()
export class ReservaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ClientEntity, client => client.reservas, { eager: true })
  client: ClientEntity;

  @Column({ type: 'date' })
  fechaInicio: Date;

  @Column({ type: 'date' })
  fechaFin: Date;
}
