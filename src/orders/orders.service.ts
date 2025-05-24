import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { ClientEntity } from 'src/clients/client.entity';
import { Product } from 'src/products/product.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,

        @InjectRepository(ClientEntity)
        private clientRepository: Repository<ClientEntity>,

        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) { }

    async createOrder(clientId: number, productIds: number[]): Promise<Order> {
        if (!productIds || productIds.length === 0) {
            throw new BadRequestException('La orden debe tener al menos un producto');
        }

        const client = await this.clientRepository.findOne({ where: { id: clientId } });
        if (!client) {
            throw new NotFoundException(`Cliente con ID ${clientId} no encontrado`);
        }

        const products = await this.productRepository.findByIds(productIds);
        if (products.length === 0) {
            throw new BadRequestException('No se encontraron productos válidos');
        }

        const totalAmount = products.reduce((sum, product) => sum + parseFloat(product.precio.toString()), 0);

        const newOrder = this.orderRepository.create({
            client,
            products,
            totalAmount,
        });

        return this.orderRepository.save(newOrder);
    }

    async findAll(): Promise<Order[]> {
        return this.orderRepository.find();
    }
}
