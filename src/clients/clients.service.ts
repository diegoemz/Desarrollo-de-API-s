import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from './client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
  ) {}

  async createClient(name: string, email: string): Promise<ClientEntity> {
    // Validar que el nombre no esté vacío
    if (!name || name.trim() === '') {
      throw new BadRequestException('El nombre no puede estar vacío');
    }

    // Validar formato de email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('El formato del email no es válido');
    }

    // Verificar si el email ya existe
    const existingClient = await this.clientRepository.findOne({
      where: { email }
    });

    if (existingClient) {
      throw new ConflictException('Ya existe un cliente con este email');
    }

    // Crear y guardar el nuevo cliente
    const newClient = this.clientRepository.create({
      nombre: name.trim(),
      email: email.toLowerCase()
    });

    return this.clientRepository.save(newClient);
  }

  async findAll(): Promise<ClientEntity[]> {
    return this.clientRepository.find();
  }

  async findById(id: number): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne({
      where: { id }
    });

    if (!client) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    return client;
  }

  async updateClient(id: number, data: Partial<ClientEntity>): Promise<ClientEntity> {
    const client = await this.findById(id);

    // Si se va a actualizar el email, verificar que sea único
    if (data.email && data.email !== client.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        throw new BadRequestException('El formato del email no es válido');
      }

      const existingClient = await this.clientRepository.findOne({
        where: { email: data.email }
      });

      if (existingClient) {
        throw new ConflictException('Ya existe un cliente con este email');
      }
    }

    // Si se va a actualizar el nombre, verificar que no esté vacío
    if (data.nombre !== undefined && (!data.nombre || data.nombre.trim() === '')) {
      throw new BadRequestException('El nombre no puede estar vacío');
    }

    Object.assign(client, data);
    return this.clientRepository.save(client);
  }

  async deleteClient(id: number): Promise<void> {
    const result = await this.clientRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
  }
}