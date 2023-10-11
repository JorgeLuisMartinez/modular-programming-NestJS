import { PrimaryGeneratedColumn, Column, Entity, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import DateAt from '../../database/globalEntities/basic.entity';
import { Product } from './product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: '255', unique: true})
  name: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @ManyToMany(()=> Product, (product)=> product.categories)
  @JoinTable()
  products: Product[];
}
