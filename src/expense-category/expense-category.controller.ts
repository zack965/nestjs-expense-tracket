import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ExpenseCategoryService } from './expense-category.service';
import { ExpenseCategory } from './expense-category.entity';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';

@Controller('expense-category')
export class ExpenseCategoryController {
    constructor(private readonly expenseCategoryService: ExpenseCategoryService) { }
    @Get()
    async getAll(): Promise<ExpenseCategory[]> {
        const categories = await this.expenseCategoryService.findAll();
        return plainToInstance(ExpenseCategory, categories);

    }
    // Get a single category by ID
    @Get(':id')
    async getOne(@Param('id') id: number): Promise<ExpenseCategory | null> {
        const category = await this.expenseCategoryService.findOne(id);
        if (!category) {
            throw new NotFoundException('Category not found');
        }
        return plainToInstance(ExpenseCategory, category);

    }

    // Create a new category
    @Post()
    async create(@Body() createExpenseCategoryDto: CreateExpenseCategoryDto): Promise<ExpenseCategory> {
        const category = this.expenseCategoryService.create(createExpenseCategoryDto.name);
        return plainToInstance(ExpenseCategory, category);

    }

    // Update an existing category
    @Put(':id')
    async update(@Param('id') id: number, @Body() updateExpenseCategoryDto: UpdateExpenseCategoryDto): Promise<ExpenseCategory | null> {
        const category_to_update = await this.expenseCategoryService.findOne(id);
        if (!category_to_update) {
            throw new NotFoundException('Category not found');
        }
        const category = this.expenseCategoryService.update(id, updateExpenseCategoryDto.name);
        return plainToInstance(ExpenseCategory, category);
    }

    // Delete a category
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<{ message: string }> {
        const category_to_delete = await this.expenseCategoryService.findOne(id);
        if (!category_to_delete) {
            throw new NotFoundException('Category not found');
        }
        await this.expenseCategoryService.remove(id);

        return { message: 'Category deleted successfully' };
    }
}
