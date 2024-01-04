import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateTaskDto {
  @MaxLength(100)
  @MinLength(2)
  @IsString()
  @IsOptional()
  title?: string;

  @MaxLength(200)
  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dueDate?: Date;
}
