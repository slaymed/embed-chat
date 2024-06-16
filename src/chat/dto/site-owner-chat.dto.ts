import { Transform } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';
import { IsDomain } from 'src/site/decorators/is-domain';

export class SiteOwnerChatDto {
  @IsDomain()
  domain: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @IsPositive()
  siteCustomerId: number;
}
