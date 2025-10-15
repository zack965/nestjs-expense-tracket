import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateExpenseDto {
    @ApiProperty({ description: 'Amount of the expense' })
    @IsNumber()
    amount: number;

    @ApiProperty({ description: 'Description of the expense' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: 'Expense category ID', required: false })
    @IsOptional()
    @IsNumber()
    expenseCategoryId?: number;
}
