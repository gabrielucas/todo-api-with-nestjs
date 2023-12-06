import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DataSource } from 'typeorm';
import { Task } from './entities/task.entity';
import { TaskRepository } from './tasks.repository';
import { DatabaseModule } from 'src/providers/database/database.module';

const taskProviders = [
  TasksService,
  TaskRepository,
  {
    provide: 'TASK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
    inject: ['DATA_SOURCE'],
  },
];

@Module({
  controllers: [TasksController],
  providers: taskProviders,
  imports: [DatabaseModule],
})
export class TasksModule {}
