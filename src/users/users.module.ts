import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DataSource } from 'typeorm';
import { UserModel } from './entities/user.entity';
import { DatabaseModule } from 'src/providers/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersRepository } from './users.repository';

const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserModel),
    inject: ['DATA_SOURCE'],
  },
  UsersRepository,
  UsersService,
];

@Module({
  controllers: [UsersController],
  providers: userProviders,
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        global: true,
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${config.get<number>('SECONDS_TO_EXPIRE_TOKEN')}s`,
        },
      }),
    }),
  ],
})
export class UsersModule {}
