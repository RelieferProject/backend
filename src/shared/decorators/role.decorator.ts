import { SetMetadata } from '@nestjs/common';
import { roleEnum } from '@prisma/client';

export const Roles = (...roles: roleEnum[]) => SetMetadata('roles', roles);
