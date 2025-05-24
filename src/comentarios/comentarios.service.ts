import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comentario } from './comentario.entity';
import { Product } from 'src/products/product.entity';

@Injectable()
export class ComentariosService {
  constructor(
    @InjectRepository(Comentario)
    private comentarioRepository: Repository<Comentario>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  async createComentario(productId: number, texto: string, puntaje: number): Promise<Comentario> {
    if (!texto || texto.length > 200) {
      throw new BadRequestException('El comentario debe tener máximo 200 caracteres');
    }
    if (!Number.isInteger(puntaje) || puntaje < 1 || puntaje > 5) {
      throw new BadRequestException('El puntaje debe ser un número entero entre 1 y 5');
    }

    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    const comentario = this.comentarioRepository.create({
      texto,
      puntaje,
      product
    });

    return this.comentarioRepository.save(comentario);
  }

  async findAll(): Promise<Comentario[]> {
    return this.comentarioRepository.find({ relations: ['product'] });
  }
}
