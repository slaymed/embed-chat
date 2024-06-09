import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

export function dbConfig(configService: ConfigService): TypeOrmModuleOptions {
  const database = configService.get('database');

  return {
    type: database.type,
    url: database.url,
    entities: [User],
    synchronize: true,
  };
}
