import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CustomersService } from './customers.service';
import { ProductsService } from './../../products/services/products.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {

  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(User) private userRepo:Repository<User>,
    private custormerService: CustomersService,
    ) {}

  findAll() {
    return this.userRepo.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  findByEmail(email: string){
    return this.userRepo.findOne({ where: { email } });
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    if (data.customerId) {
      const customer = await this.custormerService.findOne(data.customerId);
      newUser.customer = customer;
    }
    return this.userRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });
    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }

  remove(id: number) {
    if (!this.findOne(id)) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.userRepo.delete(id)
  }

  async getOrdersByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll()
    }
  }

  getTasks(){
    return new Promise((resolve, reject)=>{
      this.clientPg.query('SELECT * FROM task', (error, result)=>{
        if (error) {
          reject(error)
        }
        resolve(result.rows)
      })
    })
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepo.update(userId, {
      currentHashedRefreshToken
    });
  }

  async getById(id: number) {
    const user = await this.userRepo.findOne({where: {id} });
    if (user) {
      return user;
    }
    throw new Error('User with this id does not exist');
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.getById(userId);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(userId: number) {
    return this.userRepo.update(userId, {
      currentHashedRefreshToken: null
    });
  }

}
