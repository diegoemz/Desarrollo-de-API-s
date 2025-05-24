import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservaEntity } from './reserva.entity';
import { ClientEntity } from 'src/clients/client.entity';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(ReservaEntity)
    private reservaRepository: Repository<ReservaEntity>,

    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
  ) {}

  async createReserva(clientId: number, fechaInicio: Date, fechaFin: Date): Promise<ReservaEntity> {
    if (fechaFin <= fechaInicio) {
      throw new BadRequestException('La fecha de fin debe ser posterior a la fecha de inicio');
    }

    const client = await this.clientRepository.findOne({ where: { id: clientId } });
    if (!client) {
      throw new BadRequestException('Cliente no encontrado');
    }

    const reservasConflict = await this.reservaRepository
      .createQueryBuilder('reserva')
      .where('reserva.clientId = :clientId', { clientId })
      .andWhere('(reserva.fechaInicio BETWEEN :fechaInicio AND :fechaFin OR reserva.fechaFin BETWEEN :fechaInicio AND :fechaFin OR (:fechaInicio BETWEEN reserva.fechaInicio AND reserva.fechaFin))', 
        { fechaInicio, fechaFin })
      .getMany();

    if (reservasConflict.length > 0) {
      throw new ConflictException('El cliente ya tiene una reserva que se solapa con las fechas indicadas');
    }

    const reserva = this.reservaRepository.create({ client, fechaInicio, fechaFin });
    return this.reservaRepository.save(reserva);
  }

  async findAll(): Promise<ReservaEntity[]> {
    return this.reservaRepository.find({ relations: ['client'] });
  }
}
