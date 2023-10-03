import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn } from 'typeorm';

import DateAt from '../../database/globalEntities/basic.entity';
import { User } from './user.entity';

@Entity()
export class Customer extends DateAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: '255', unique: true})
  name: string;

  @Column({type: 'varchar'})
  lastName: string;

  @Column({type: 'varchar'})
  phone: string;

  @OneToOne(()=> User, (user)=> user.customer, {nullable:true})
  user: User;

}
