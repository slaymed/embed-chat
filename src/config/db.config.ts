import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Chat } from 'src/chat/entities/chat.entity';
import { Message } from 'src/message/entities/message.entity';
import { Site } from 'src/site/entities/site.entity';
import { User } from 'src/user/entities/user.entity';

export function dbConfig(configService: ConfigService): TypeOrmModuleOptions {
  const database = configService.get('database');

  return {
    type: database.type,
    host: database.host,
    port: database.port,
    username: database.username,
    password: database.password,
    database: database.database,
    entities: [User, Chat, Site, Message],
    synchronize: true,
  };
}
