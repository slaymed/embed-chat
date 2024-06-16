import { Transform } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';
import { toNumber } from 'src/common/utils/transformer.util';
import { IsDomain } from 'src/site/decorators/is-domain';

export class SiteCustomerChatDto {
  @IsDomain()
  domain: string;

  @Transform(({ value }) => toNumber(value, 10))
  @IsInt()
  @IsPositive()
  siteOwnerId: number;
}
