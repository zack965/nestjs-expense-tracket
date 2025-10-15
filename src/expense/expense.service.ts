import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './expense.entity';
import { Repository } from 'typeorm';
import { ExpenseCategory } from 'src/expense-category/expense-category.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpenseService {
    constructor(
        @InjectRepository(Expense)
        private readonly expenseRepository: Repository<Expense>,

        @InjectRepository(ExpenseCategory)
        private readonly categoryRepository: Repository<ExpenseCategory>,
    ) { }
    async findAll(): Promise<Expense[]> {
        return this.expenseRepository.find();
    }

    async findOne(id: number): Promise<Expense> {
        const expense = await this.expenseRepository.findOne({ where: { id }, relations: ['expenseCategory'] });
        if (!expense) throw new NotFoundException(`Expense with id ${id} not found`);
        return expense;
    }

    async create(dto: CreateExpenseDto): Promise<Expense> {
        const expense = new Expense();
        expense.amount = dto.amount;
        expense.description = dto.description;

        if (dto.expenseCategoryId) {
            const category = await this.categoryRepository.findOne({ where: { id: dto.expenseCategoryId } });
            if (!category) throw new NotFoundException(`Category with id ${dto.expenseCategoryId} not found`);
            expense.expenseCategory = category;
        }

        return this.expenseRepository.save(expense);
    }

    async update(id: number, dto: UpdateExpenseDto): Promise<Expense> {
        const expense = await this.findOne(id);

        if (dto.amount !== undefined) expense.amount = dto.amount;
        if (dto.description !== undefined) expense.description = dto.description;

        if (dto.expenseCategoryId !== undefined) {
            const category = await this.categoryRepository.findOne({ where: { id: dto.expenseCategoryId } });
            if (!category) throw new NotFoundException(`Category with id ${dto.expenseCategoryId} not found`);
            expense.expenseCategory = category;
        }

        return this.expenseRepository.save(expense);
    }

    async remove(id: number): Promise<void> {
        const expense = await this.findOne(id);
        await this.expenseRepository.remove(expense);
    }
}
