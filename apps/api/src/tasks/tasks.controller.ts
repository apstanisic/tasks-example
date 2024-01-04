import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Auth } from '../auth/auth.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    const task = await this.tasksService.getById(id);
    return { data: task };
  }

  @Get()
  async getMany(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number
  ) {
    const response = await this.tasksService.getMany(page);
    return response;
  }

  @Post()
  async create(@Body() data: CreateTaskDto) {
    const createdTask = await this.tasksService.create(data);
    return { data: createdTask };
  }

  @Auth()
  @Patch(':id')
  async updateById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateTaskDto
  ) {
    const updatedTask = await this.tasksService.updateById(id, data);
    return { data: updatedTask };
  }

  @Auth()
  @Delete(':id')
  async deleteById(@Param('id', ParseUUIDPipe) id: string) {
    const deletedTask = await this.tasksService.deleteById(id);
    return { data: deletedTask };
  }
}
