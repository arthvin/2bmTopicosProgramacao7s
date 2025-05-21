import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Promise<Task> {
    return await this.tasksService.createTask(title, description);
  }

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return await this.tasksService.getAllTasks();
  }

  @Patch(':id/status')
  async updateTaskStatus(
    @Param('id') id: number,
    @Body('status') status: string,
  ): Promise<Task> {
    return await this.tasksService.updateTaskStatus(id, status);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<void> {
    return await this.tasksService.deleteTask(id);
  }
}
