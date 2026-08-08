import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';
import { AUTH_CONSTANTS } from '../constants/auth.constants';

export const Roles = (...roles: Role[]) => SetMetadata(AUTH_CONSTANTS.ROLES_KEY, roles);
