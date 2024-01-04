import { IsString, MaxLength, MinLength } from 'class-validator';
import { UpdateTaskDto } from './update-task.dto';

export class CreateTaskDto extends UpdateTaskDto {
  @MaxLength(100)
  @MinLength(2)
  @IsString()
  title!: string;
}
