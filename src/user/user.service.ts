import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserParams, UpdateUserPrams } from './user.types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findAll(options: FindManyOptions<User>): Promise<User[]> {
    return this.usersRepository.find(options);
  }

  count(options?: FindManyOptions<User>): Promise<number> {
    return this.usersRepository.count(options);
  }

  async findOne(options: FindOneOptions<User>): Promise<User | null> {
    return this.usersRepository.findOne(options);
  }

  async findOneOrFail(options: FindOneOptions<User>): Promise<User> {
    const user = await this.findOne(options);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(params: CreateUserParams): Promise<User> {
    const emailTaken = await this.findOne({
      where: {
        email: params.email,
      },
    });
    if (emailTaken) {
      throw new ConflictException('Email already taken');
    }
    const createdUser = this.usersRepository.create(params);
    return this.usersRepository.save(createdUser);
  }

  async updateOne(user: number | User, params: UpdateUserPrams): Promise<User> {
    if (typeof user === 'number') {
      user = await this.findOneOrFail({
        where: {
          id: user,
        },
      });
    }
    return this.usersRepository.save(Object.assign(user, params));
  }

  delete(where: FindOptionsWhere<User>): Promise<DeleteResult> {
    return this.usersRepository.delete(where);
  }
}
