import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/product.entity';
import { ProductsModule } from './products/products.module';
import { ClientsModule } from './clients/clients.module';
import { ClientEntity } from './clients/client.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'suser',
      database: 'apicurso',
      entities: [Product, ClientEntity],
      synchronize: true,
    }), 
    ProductsModule, ClientsModule
  ]
})
export class AppModule {}
