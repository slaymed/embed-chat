import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { SiteService } from './site.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { RequestUser } from 'src/user/decorators/request-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/user/decorators/roles';
import { UserRole } from 'src/user/enums/role.enum';

@Controller('sites')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Roles(UserRole.SiteOwner)
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post()
  create(@RequestUser() user: User, @Body() dto: CreateSiteDto) {
    return this.siteService.create({
      ownerId: user.id,
      domain: dto.domain,
    });
  }
}
