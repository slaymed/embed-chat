import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../enums/role.enum';

export const ROLES_KEY = 'roles';
export function Roles(...roles: UserRole[]) {
  return SetMetadata(ROLES_KEY, roles);
}
