import { Module } from '@nestjs/common';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './expense.entity';
import { ExpenseCategory } from 'src/expense-category/expense-category.entity';
import { ExpenseCategoryModule } from 'src/expense-category/expense-category.module';

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService],
  imports: [TypeOrmModule.forFeature([Expense]), ExpenseCategoryModule],

})
export class ExpenseModule { }
