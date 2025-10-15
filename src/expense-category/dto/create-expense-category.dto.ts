import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';



export class CreateExpenseCategoryDto {
    @ApiProperty({
        description: 'The name of the expense category',
        example: 'Food',
    })
    @IsNotEmpty({ message: 'name is required' })
    @IsString({ message: 'name must be a string' })
    name: string;
}