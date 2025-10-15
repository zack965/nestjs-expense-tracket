import { Module } from '@nestjs/common';
import { ExpenseCategoryService } from './expense-category.service';
import { ExpenseCategoryController } from './expense-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseCategory } from './expense-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseCategory])],
  providers: [ExpenseCategoryService],
  controllers: [ExpenseCategoryController],
  exports: [TypeOrmModule], // ✅ Export the module, not the entity

})
export class ExpenseCategoryModule { }
