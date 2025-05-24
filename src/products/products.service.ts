import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { ClientEntity } from 'src/clients/client.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
  ) {}

  async createProduct(
    nombre: string,
    precio: number,
    stock: number,
    clientId: number,
  ): Promise<Product> {
    if (!nombre || nombre.trim() === '') {
      throw new BadRequestException('El nombre no debe estar vacío');
    }

    if (typeof precio !== 'number' || precio <= 0) {
      throw new BadRequestException('El precio debe ser mayor a 0');
    }

    if (!Number.isInteger(stock) || stock <= 0) {
      throw new BadRequestException('El stock debe ser un número entero positivo');
    }

    const client = await this.clientRepository.findOneBy({ id: clientId });

    if (!client) {
      throw new BadRequestException('El cliente no fue encontrado');
    }

    const nuevo = this.productsRepository.create({
      nombre,
      precio,
      stock,
      client,
    });

    return this.productsRepository.save(nuevo);
  }

  async findAllProducts(): Promise<Product[]> {
    return this.productsRepository.find({ relations: ['client'] });
  }
}
