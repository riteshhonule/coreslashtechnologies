import { SetMetadata } from '@nestjs/common';
import { AUTH_CONSTANTS } from '../constants/auth.constants';

export const Permissions = (...permissions: string[]) =>
  SetMetadata(AUTH_CONSTANTS.PERMISSIONS_KEY, permissions);
