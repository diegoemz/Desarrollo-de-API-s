import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './client.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ClientEntity])],
  providers: [ClientsService],
  controllers: [ClientsController],
  exports: [TypeOrmModule],
})
export class ClientsModule {}
