import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import DateAt from '../../database/globalEntities/basic.entity';

@Entity()
export class Category extends DateAt{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: '255', unique: true})
  name: string;
}
