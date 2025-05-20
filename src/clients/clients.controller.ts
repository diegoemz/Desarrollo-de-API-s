import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientEntity } from './client.entity';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientService: ClientsService) {}

  @Post()
  async create(@Body() body: { nombre: string; email: string }): Promise<ClientEntity> {
    return this.clientService.createClient(body.nombre, body.email);
  }

  @Get()
  async findAll(): Promise<ClientEntity[]> {
    return this.clientService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ClientEntity> {
    return this.clientService.findById(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Partial<ClientEntity>): Promise<ClientEntity> {
    return this.clientService.updateClient(+id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.clientService.deleteClient(+id);
  }
}