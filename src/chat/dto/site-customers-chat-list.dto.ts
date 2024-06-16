import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { toBoolean } from 'src/common/utils/transformer.util';
import { IsDomain } from 'src/site/decorators/is-domain';

export class SiteCustomersChatListDto {
  @IsDomain()
  domain: string;

  @IsOptional()
  @Transform(({ value }) => toBoolean(value))
  @IsBoolean()
  value: boolean;
}
