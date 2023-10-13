import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, ManyToMany, Index } from 'typeorm';

import DateAt from '../../database/globalEntities/basic.entity';
import { Brand } from './brand.entity';
import { Category } from './category.entity';


@Entity()
@Index(['price', 'stock'])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: '255', unique: true})
  name: string;

  @Column({type: 'text'})
  description: string;

  @Index()
  @Column({type: 'int'})
  price: number;

  @Column({type: 'int'})
  stock: number;

  @Column({type: 'varchar'})
  image: string;

  @ManyToOne(()=> Brand, (brand)=> brand.products)
  brand: Brand;

  @ManyToMany(()=> Category, (category)=> category.products)
  categories: Category[];
}
