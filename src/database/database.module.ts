import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'pg';

import config from './../config';

const API_KEY = '123456789';
const PROD_API_KEY = 'AAAAA123456789';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbUser, dbPassword, dbHost, dbPort, dbName } = configService.postgres;
        return {
          type: 'postgres',
          host: dbHost,
          port: dbPort,
          username: dbUser,
          password: dbPassword,
          database: dbName,
          ssl: {
            rejectUnauthorized: false,
          },
          autoLoadEntities: true,
          synchronize: false,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>)=>{
        const { dbUser, dbPassword, dbHost, dbPort, dbName } = configService.postgres;
        const client = new Client({
          user: dbUser,
          password: dbPassword,
          host: dbHost,
          port: dbPort,
          database: dbName,
          ssl: {
            rejectUnauthorized: false,
          },
        });
        
        client.connect();
        return client;
      },
      inject: [config.KEY]
    },
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'production' ? PROD_API_KEY : API_KEY,
    },
  ],
  exports: ['PG', 'API_KEY', TypeOrmModule ],
})
export class DatabaseModule {}
