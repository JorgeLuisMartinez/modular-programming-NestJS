import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

import DateAt from '../../database/globalEntities/basic.entity';
import { Customer } from './customer.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: '255', unique: true})
  email: string;

  @Exclude()
  @Column({type: 'varchar'})
  password: string;

  @Column({type: 'varchar'})
  role: string;

  @OneToOne(()=> Customer, (customer)=> customer.user, { nullable: true })
  @JoinColumn({ name: 'customer_id' })//El join column solo debe ir en uno de los dos lados de la relaciono uno a uno, la entidad que tenga la relacion es la que debe llevar el @joinColumn()
  customer: Customer;
}
