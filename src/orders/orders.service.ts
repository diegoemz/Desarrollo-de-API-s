import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../products/product.entity';
import { ClientEntity } from 'src/clients/client.entity';
import { In } from 'typeorm'; // esto se pone para: 

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(ClientEntity)
    private clientRepo: Repository<ClientEntity>,
  ) {}

  async createOrder (clientId: number, productIds: number[]): Promise<Order>{
    if (productIds.length === 0) {
      throw new BadRequestException('Debe agregar al menos un producto');
    }
    
    const client = await this.clientRepo.findOneBy({id: clientId});

    //Hay que hacer esto para dejarle claro a typescript que el campo client, no debe de estar null, sino da error
    if(!client){
        throw new BadRequestException('El cliente no fue encontrado')
    }
    const products = await this.productRepo.findBy({
        id: In(productIds),
    })

    const totalAmount = products.reduce((sum, p) => sum + Number(p.precio), 0);

    const order = this.orderRepo.create({
      products,
      client,
      totalAmount,
    });

    return this.orderRepo.save(order);
  }

  findAll() {
    return this.orderRepo.find({ relations: ['client', 'products'] });
  }
}
