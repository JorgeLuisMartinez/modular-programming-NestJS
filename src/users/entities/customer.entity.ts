import { PrimaryGeneratedColumn, Column, Entity, OneToOne ,OneToMany } from 'typeorm';

import DateAt from '../../database/globalEntities/basic.entity';
import { User } from './user.entity';
import { Order } from './order.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: '255', unique: true})
  name: string;

  @Column({type: 'varchar'})
  lastName: string;

  @Column({type: 'varchar'})
  phone: string;

  @OneToOne(()=> User, (user)=> user.customer, { nullable:true })
  user: User;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
