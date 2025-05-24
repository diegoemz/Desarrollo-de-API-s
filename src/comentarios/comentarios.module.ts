import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comentario } from './comentario.entity';
import { ComentariosService } from './comentarios.service';
import { ComentariosController } from './comentarios.controller';
import { Product } from 'src/products/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comentario, Product])],
  providers: [ComentariosService],
  controllers: [ComentariosController]
})
export class ComentariosModule {}
