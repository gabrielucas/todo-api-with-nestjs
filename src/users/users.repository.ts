import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserModel } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly repository: Repository<UserModel>,
  ) {}

  public async create(user: CreateUserDto) {
    return this.repository.save(user);
  }

  public async findOne(email: string) {
    return this.repository.findOneBy({ email });
  }
}
