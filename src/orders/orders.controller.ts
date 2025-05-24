import { Controller, Post, Get, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto/create-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService){}

    //defino mis decoradores para marcar mis metodos como endpoints

    @Post()// este endpoint, espera que yo le meta info
    @UsePipes(new ValidationPipe({whitelist: true}))
    createOrder(@Body() body: {clientId: number; productIds: number[]}){
        return this.ordersService.createOrder(body.clientId, body.productIds);
    }

    @Get() //decorador que me devuelve toda la info de mi endpoint get
    findAll(){
        return this.ordersService.findAll();
    }
}
