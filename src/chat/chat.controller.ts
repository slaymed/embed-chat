import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { RequestUser } from 'src/user/decorators/request-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { UserRole } from 'src/user/enums/role.enum';
import { Roles } from 'src/user/decorators/roles';
import { SiteService } from 'src/site/site.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { SiteCustomerChatDto } from './dto/site-customer-chat.dto';
import { SiteOwnerChatDto } from './dto/site-owner-chat.dto';
import { SiteCustomersChatListDto } from './dto/site-customers-chat-list.dto';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly siteService: SiteService,
  ) {}

  @Roles(UserRole.SiteOwner)
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Get('site-owner')
  async loadSiteOwnerChat(
    @RequestUser() user: User,
    @Query() dto: SiteOwnerChatDto,
  ) {
    const site = await this.siteService.findUniqueOrFail(dto.domain, user.id);
    return this.chatService.findOneOrFail({
      where: {
        siteId: site.id,
        siteCustomerId: dto.siteCustomerId,
      },
    });
  }

  @Roles(UserRole.SiteOwner)
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Get('site-customers')
  async loadSiteCustomersChatList(
    @RequestUser() user: User,
    @Query() dto: SiteCustomersChatListDto,
  ) {
    console.log(dto.value);
    const site = await this.siteService.findUniqueOrFail(dto.domain, user.id);
    return this.chatService.findAll({
      where: {
        siteId: site.id,
      },
    });
  }

  @Roles(UserRole.SiteCustomer)
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Get('site-customer')
  async loadSiteCustomerChat(
    @RequestUser() user: User,
    @Query() dto: SiteCustomerChatDto,
  ) {
    const site = await this.siteService.findUniqueOrFail(
      dto.domain,
      dto.siteOwnerId,
    );
    return this.chatService.findOrCreate({
      siteId: site.id,
      siteCustomerId: user.id,
    });
  }

  @Roles(UserRole.SiteCustomer)
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post()
  async createChat(
    @RequestUser() user: User,
    @Body() dto: SiteCustomerChatDto,
  ) {
    const site = await this.siteService.findUniqueOrFail(
      dto.domain,
      dto.siteOwnerId,
    );
    return this.chatService.create({
      siteId: site.id,
      siteCustomerId: user.id,
    });
  }
}
