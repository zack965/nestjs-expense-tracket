import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";



export class UpdateExpenseCategoryDto {
    @ApiProperty({
        description: 'The name of the expense category',
        example: 'Food',
    })
    @IsNotEmpty({ message: 'name is required' })
    @IsString({ message: 'name must be a string' })
    name: string;
}