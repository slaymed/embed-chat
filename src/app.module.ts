import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { SiteModule } from './site/site.module';
import { appConfig } from './config/app.config';
import { dbConfig } from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: dbConfig,
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    ChatModule,
    MessageModule,
    SiteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
