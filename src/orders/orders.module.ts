import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientEntity } from 'src/clients/client.entity';
import { Product } from 'src/products/product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order, ClientEntity, Product])],
    providers: [OrdersService],
    controllers: [OrdersController],
})
export class OrdersModule {}
