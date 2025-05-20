import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}

    @Post()
    create(@Body() body:{nombre: string, precio: number, stock: number}): Promise<Product>{
        return this.productsService.createProduct(body.nombre, body.precio, body.stock)
    }

    @Get()
    findAllProducts(): Promise<Product[]>{
        return this.productsService.findAllProducts()
    }
}
