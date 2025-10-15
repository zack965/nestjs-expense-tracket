import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateExpenseDto {
    @ApiPropertyOptional({ description: 'Amount of the expense' })
    @IsOptional()
    @IsNumber()
    amount?: number;

    @ApiPropertyOptional({ description: 'Description of the expense' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description?: string;

    @ApiPropertyOptional({ description: 'Expense category ID' })
    @IsOptional()
    @IsNumber()
    expenseCategoryId?: number;
}
