import { Controller, Post, Body, Get } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { Comentario } from './comentario.entity';

@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @Post()
  create(@Body() body: { productId: number; texto: string; puntaje: number }): Promise<Comentario> {
    return this.comentariosService.createComentario(body.productId, body.texto, body.puntaje);
  }

  @Get()
  findAll(): Promise<Comentario[]> {
    return this.comentariosService.findAll();
  }
}
