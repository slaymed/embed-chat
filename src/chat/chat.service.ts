import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  DeleteResult,
} from 'typeorm';
import { Chat } from './entities/chat.entity';
import { CreateChatParams, UpdateChatParams } from './chat.types';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) {}

  async create(params: CreateChatParams) {
    const chatExist = await this.chatRepository.findOne({
      where: {
        siteId: params.siteId,
        siteCustomerId: params.siteCustomerId,
      },
    });
    if (chatExist) {
      throw new ConflictException('Chat already exists');
    }
    const createdChat = this.chatRepository.create(params);
    return this.chatRepository.save(createdChat);
  }

  findAll(options?: FindManyOptions<Chat>): Promise<Chat[]> {
    return this.chatRepository.find(options);
  }

  findOne(options: FindOneOptions<Chat>): Promise<Chat | null> {
    return this.chatRepository.findOne(options);
  }

  async findOneOrFail(options: FindOneOptions<Chat>): Promise<Chat> {
    const user = await this.findOne(options);
    if (!user) {
      throw new NotFoundException('Chat not found');
    }
    return user;
  }

  async updateOne(
    chat: number | Chat,
    params: UpdateChatParams,
  ): Promise<Chat> {
    if (typeof chat === 'number') {
      chat = await this.findOneOrFail({
        where: {
          id: chat,
        },
      });
    }
    return this.chatRepository.save(Object.assign(chat, params));
  }

  delete(where: FindOptionsWhere<Chat>): Promise<DeleteResult> {
    return this.chatRepository.delete(where);
  }
}
