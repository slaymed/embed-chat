import { IsDomain } from '../decorators/is-domain';

export class CreateSiteDto {
  @IsDomain()
  domain: string;
}
