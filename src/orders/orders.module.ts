import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import { ClientEntity } from 'src/clients/client.entity';
import { Order } from './order.entity';


@Module({
  //Le digo a nest que dentro de ese modulo me use los repositorios de las entidades para consultar sus datos
  imports: [TypeOrmModule.forFeature([Order, ClientEntity, Product])],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}
