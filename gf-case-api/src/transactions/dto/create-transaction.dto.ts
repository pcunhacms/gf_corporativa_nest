import { IsString,
    IsNumber,
    IsEnum,
    IsDateString
 } from "class-validator";

 import { TransactionType } from "../entities/transaction.entity";

 export class CreateTransactionDto {
    @IsString()
    description!: string;

    @IsNumber()
    value!: number;

    @IsEnum(TransactionType)
    type!: TransactionType;

    @IsDateString()
    date!: string;

    @IsString()
    categoryId!: string;





 }