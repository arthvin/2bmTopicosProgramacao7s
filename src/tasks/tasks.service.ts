import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async createTask(title: string, description: string): Promise<Task> {
    const task = this.taskRepository.create({
      title,
      description,
      status: 'PENDENTE',
    });
    return await this.taskRepository.save(task);
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async updateTaskStatus(id: number, status: string): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) throw new NotFoundException('Tarefa não encontrada');
    task.status = status;
    return await this.taskRepository.save(task);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Tarefa não encontrada');
    }
  }
}
