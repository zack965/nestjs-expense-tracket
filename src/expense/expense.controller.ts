import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExpenseService } from './expense.service';
import { Expense } from './expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
@Controller('expense')
export class ExpenseController {
    constructor(private readonly expenseService: ExpenseService) { }
    @Get()
    @ApiOperation({ summary: 'Get all expenses' })
    @ApiResponse({ status: 200, description: 'List of expenses', type: [Expense] })
    async findAll(): Promise<Expense[]> {
        return this.expenseService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get expense by ID' })
    @ApiResponse({ status: 200, description: 'Expense found', type: Expense })
    async findOne(@Param('id') id: number): Promise<Expense> {
        return this.expenseService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new expense' })
    @ApiResponse({ status: 201, description: 'Expense created', type: Expense })
    async create(@Body() dto: CreateExpenseDto): Promise<Expense> {
        return this.expenseService.create(dto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update an expense' })
    @ApiResponse({ status: 200, description: 'Expense updated', type: Expense })
    async update(@Param('id') id: number, @Body() dto: UpdateExpenseDto): Promise<Expense> {
        return this.expenseService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an expense' })
    @ApiResponse({ status: 204, description: 'Expense deleted' })
    async remove(@Param('id') id: number): Promise<{ message: string }> {
        this.expenseService.remove(id);
        return { message: `Expense with id ${id} deleted successfully` };
    }
}
