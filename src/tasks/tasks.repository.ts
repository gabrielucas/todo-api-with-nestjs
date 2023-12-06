import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskRepository {
  constructor(
    @Inject('TASK_REPOSITORY') private readonly repository: Repository<Task>,
  ) {}

  public async create(task: CreateTaskDto) {
    return this.repository.save(task);
  }

  public async findAll() {
    return this.repository.find();
  }

  public async findOne(id: string) {
    return this.repository.findOneBy({ id });
  }
}
