import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  public async create(createTaskDto: CreateTaskDto) {
    return this.taskRepository.create(createTaskDto);
  }

  public async findAll() {
    return this.taskRepository.findAll();
  }

  public async findOne(id: string) {
    const task = await this.taskRepository.findOne(id);
    console.log(task);

    if (!task)
      throw new NotFoundException({
        name: '',
        message: 'Task not found',
      });

    return task;
  }

  public async update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  public async remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
