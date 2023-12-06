import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { SigninDto } from './dto/signin.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  private passwordSaltRounds: number;

  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.passwordSaltRounds = Number(
      this.configService.get<number>('PASSWORD_SALT_ROUNDS'),
    );
  }

  public async create(createUserDto: CreateUserDto) {
    const validateUser = await this.userRepository.findOne(createUserDto.email);
    console.log(validateUser);

    if (validateUser) {
      throw new BadRequestException('User already exists');
    }

    const user: CreateUserDto = {
      ...createUserDto,
      password: bcrypt.hashSync(
        createUserDto.password,
        this.passwordSaltRounds,
      ),
    };

    await this.userRepository.create(user);

    return {
      message: 'User created successfully',
    };
  }

  public async signin({ email, password }: SigninDto) {
    const user = await this.userRepository.findOne(email);

    const passwordToCompare = bcrypt.hashSync(
      password,
      this.passwordSaltRounds,
    );

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException({
        name: '',
        message: 'Invalid credentials',
      });
    }

    const accessToken = await this.jwtService.signAsync({
      name: user.name,
      email: user.email,
    });

    return {
      access_token: accessToken,
      name: user.name,
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
