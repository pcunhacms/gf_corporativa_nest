import { IsOptional, IsString, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';

export class UpdateTransactionDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  value?: number;

  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;
}