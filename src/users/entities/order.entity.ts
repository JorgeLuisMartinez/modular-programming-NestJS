import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

import { User } from './user.entity';
import { Product } from './../../products/entities/product.entity';
import DateAt from '../../database/globalEntities/basic.entity';


export class Order {
    date: Date;
    user: User;
    products: Product[];
}
