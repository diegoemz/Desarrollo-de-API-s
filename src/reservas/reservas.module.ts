import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaEntity } from './reserva.entity';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { ClientEntity } from 'src/clients/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReservaEntity, ClientEntity])],
  providers: [ReservasService],
  controllers: [ReservasController],
  exports: [ReservasService],
})
export class ReservasModule {}
