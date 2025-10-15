import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseCategoryModule } from './expense-category/expense-category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [
    ExpenseCategoryModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 6034,
      username: 'root',
      password: 'my-secret-pw',
      database: 'my_pocket',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ExpenseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
