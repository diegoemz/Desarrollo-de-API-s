import {
  IsArray,
  ArrayNotEmpty,
  IsPositive,
  IsInt,
} from 'class-validator';

export class CreateOrderDto {
  @IsInt({ message: 'El ID del cliente está mal escrito, debe ser un número entero' })
  @IsPositive({ message: 'El ID del cliente debe contener números positivos' })
  clientId: number;

  @IsArray({ message: 'Debe de enviar una lista de productos' })
  @ArrayNotEmpty({ message: 'Debe de agregar al menos un producto' })
  @IsInt({ each: true, message: 'Los IDs de los productos son números enteros' })
  productIds: number[];
}
