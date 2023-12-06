import { Module } from '@nestjs/common';
import { databaseProviders } from './orm-config';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
