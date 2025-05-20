import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) {}

    async createProduct(nombre: string, precio: number, stock: number): Promise<Product>{
        if (!nombre || nombre.trim()=== ''){
            throw new BadRequestException('El nombre no debe estar vacio')
        }

        if (typeof precio !== 'number' || precio <= 0){
            throw new BadRequestException('El precio debe ser mayor a 0')
        }

        if (!Number.isInteger(stock) || stock <= 0){
            throw new BadRequestException('El stock debe ser un número entero positivo')
        }

        const nuevo = this.productsRepository.create({nombre, precio, stock});

        return this.productsRepository.save(nuevo);
    }

    async findAllProducts(): Promise<Product[]>{
        return this.productsRepository.find();
    }
}

