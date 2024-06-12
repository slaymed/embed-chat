import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { RequestUser } from 'src/user/decorators/request-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { UserRole } from 'src/user/enums/role.enum';
import { Roles } from 'src/user/decorators/roles';
import { SiteService } from 'src/site/site.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly siteService: SiteService,
  ) {}

  @Roles(UserRole.SiteClient)
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post()
  async createChat(@RequestUser() user: User, @Body() dto: CreateChatDto) {
    const site = await this.siteService.findOneOrFail({
      where: {
        domain: dto.domain,
        ownerId: dto.siteOwnerId,
      },
      relations: ['siteOwner'],
    });

    return this.chatService.create({
      siteId: site.id,
      siteCustomerId: user.id,
    });
  }
}
