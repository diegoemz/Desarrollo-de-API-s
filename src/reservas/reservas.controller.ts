import { Controller, Post, Body, Get } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { ReservaEntity } from './reserva.entity';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  async createReserva(
    @Body() body: { clientId: number; fechaInicio: Date; fechaFin: Date }
  ): Promise<ReservaEntity> {
    return this.reservasService.createReserva(body.clientId, body.fechaInicio, body.fechaFin);
  }

  @Get()
  async findAll(): Promise<ReservaEntity[]> {
    return this.reservasService.findAll();
  }
}
