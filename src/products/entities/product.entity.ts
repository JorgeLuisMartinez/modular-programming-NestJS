import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import DateAt from '../../database/globalEntities/basic.entity';

@Entity()
export class Product extends DateAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: '255', unique: true})
  name: string;

  @Column({type: 'text'})
  description: string;

  @Column({type: 'int'})
  price: number;

  @Column({type: 'int'})
  stock: number;

  @Column({type: 'varchar'})
  image: string;
}
