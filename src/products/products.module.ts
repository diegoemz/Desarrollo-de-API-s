import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ClientEntity } from 'src/clients/client.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product, ClientEntity])],
    providers: [ProductsService],
    controllers: [ProductsController],
    exports: [TypeOrmModule]
})
export class ProductsModule {}
