import { HttpModule, Module, HttpService } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

const API_KEY= '123456789';
const PROD_API_KEY= 'AAAAA123456789';

@Module({
  imports: [HttpModule ,UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'production' ? PROD_API_KEY : API_KEY,
    },
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) =>{
        // Como realizar la peticion a la API
        const tasks  = await http.get('https://jsonplaceholder.typicode.com/todos').toPromise();
        return tasks.data;
      },
      inject: [HttpService]
    },
  ],
})
export class AppModule {}
