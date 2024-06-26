import { IsInt, IsPositive } from 'class-validator';
import { IsDomain } from 'src/site/decorators/is-domain';

export class CreateChatDto {
  @IsDomain()
  domain: string;

  @IsInt()
  @IsPositive()
  siteOwnerId: number;
}
