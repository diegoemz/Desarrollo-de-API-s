import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    async createOrder(@Body() body: { clientId: number; productIds: number[] }): Promise<Order> {
        return this.ordersService.createOrder(body.clientId, body.productIds);
    }

    @Get()
    async findAllOrders(): Promise<Order[]> {
        return this.ordersService.findAll();
    }
}
