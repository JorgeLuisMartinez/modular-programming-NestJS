import { Module, Global } from '@nestjs/common';

const API_KEY = '123456789';
const PROD_API_KEY = 'AAAAA123456789';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'production' ? PROD_API_KEY : API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
