import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseCategory } from './expense-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExpenseCategoryService {
    constructor(
        @InjectRepository(ExpenseCategory)
        private expenseCategoryRepository: Repository<ExpenseCategory>,
    ) { }
    async findAll(): Promise<ExpenseCategory[]> {
        return this.expenseCategoryRepository.find({ relations: ['expenses'] });
    }

    async findOne(id: number): Promise<ExpenseCategory | null> {
        return this.expenseCategoryRepository.findOneBy({ id });
    }

    async create(name: string): Promise<ExpenseCategory> {
        const category = this.expenseCategoryRepository.create({ name });
        return this.expenseCategoryRepository.save(category);
    }

    async update(id: number, name: string): Promise<ExpenseCategory | null> {
        await this.expenseCategoryRepository.update(id, { name });
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.expenseCategoryRepository.delete(id);
    }
}
