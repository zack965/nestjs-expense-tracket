import { ApiProperty } from '@nestjs/swagger';
import { ExpenseCategory } from 'src/expense-category/expense-category.entity';

export class ExpenseDto {
    @ApiProperty({ example: 1, description: 'Unique identifier of the expense' })
    id: number;

    @ApiProperty({ example: 250.75, description: 'Amount of the expense' })
    amount: number;

    @ApiProperty({ example: 'Groceries at supermarket', description: 'Short description of the expense' })
    description: string;

    @ApiProperty({
        type: () => ExpenseCategory,
        nullable: true,
        description: 'Category linked to this expense',
    })
    expenseCategory: ExpenseCategory | null;

    @ApiProperty({ example: '2025-10-15T12:00:00Z', description: 'Creation date of the expense' })
    createdAt: Date;

    @ApiProperty({ example: '2025-10-15T12:00:00Z', description: 'Last update date of the expense' })
    updatedAt: Date;

    @ApiProperty({ example: 'a1b2c3d4-5678-9101-1121-314151617181', description: 'UUID of the expense' })
    uuid: string;
}
