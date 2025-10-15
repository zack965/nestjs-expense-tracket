import { ApiProperty } from '@nestjs/swagger';
import { Expense } from 'src/expense/expense.entity';

export class ExpenseCategoryDto {
    @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', description: 'UUID of the category' })
    uuid: string;

    @ApiProperty({ example: 'Food', description: 'Name of the expense category' })
    name: string;

    @ApiProperty({ example: '2025-10-15T12:00:00Z', description: 'Creation date' })
    createdAt: Date;

    @ApiProperty({ example: '2025-10-15T13:00:00Z', description: 'Last update date' })
    updatedAt: Date;

    @ApiProperty({
        type: () => [Expense],
        description: 'List of expenses that belong to this category',
        required: false,
    })
    expenses?: Expense[];
}
