import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import config from './config';

@Injectable()
export class AppService {

  constructor(
  @Inject('TASKS') private tasks: any[], 
  @Inject('PG') private clientPg: Client, 
  @Inject(config.KEY) private configService: ConfigType<typeof config>
  ){}

  getHello(): string {
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;

    return `Hola mundo la key es: ${apiKey} y el db name es: ${dbName}`;
  }

  getTasks(){
    return new Promise((resolve, reject)=>{
      this.clientPg.query('SELECT * FROM task', (error, result)=>{
        if (error) {
          reject(error)
        }
        resolve(result.rows);
      })
    })
  }



}
