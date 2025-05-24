import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/product.entity';
import { ProductsModule } from './products/products.module';
import { ClientsModule } from './clients/clients.module';
import { ClientEntity } from './clients/client.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/order.entity';
import { ReservasModule } from './reservas/reservas.module';
import { ComentariosModule } from './comentarios/comentarios.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'suser',
      database: 'apicurso',
      entities:  [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }), 
    ProductsModule, ClientsModule, OrdersModule, ReservasModule, ComentariosModule,
  ],
})
export class AppModule {}
