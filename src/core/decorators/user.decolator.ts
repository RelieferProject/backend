import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { roleEnum } from '@prisma/client';

export interface userType {
  address: string;
  name?: string;
  email?: string;
  isVerified: boolean;
  role: roleEnum;
}

export const User = createParamDecorator((data, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request.user;
});
