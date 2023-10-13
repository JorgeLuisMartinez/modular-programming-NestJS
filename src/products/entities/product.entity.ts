import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, ManyToMany, Index, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';

import DateAt from '../../database/globalEntities/basic.entity';
import { Brand } from './brand.entity';
import { Category } from './category.entity';
import Joi from 'joi';


@Entity({ name: 'products' })
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

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updateAt: Date;

  @ManyToOne(()=> Brand, (brand)=> brand.products) // El decorador many to one sin necesidad de tener joincolunm lleva la relacion.
  @JoinColumn({ name: 'brand_id' }) // Sin embargo si queremos especificar con snake case el nombre de este dato, hacemos uso del joincolunm en el padre de la relacion, solo para pasarle el atributo name.
  brand: Brand;

  @ManyToMany(()=> Category, (category)=> category.products)
  categories: Category[];
}
