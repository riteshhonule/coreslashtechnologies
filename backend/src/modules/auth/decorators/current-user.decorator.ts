import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUserResponse } from '../interfaces/auth.interface';

export const CurrentUser = createParamDecorator(
  (data: keyof IUserResponse | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as IUserResponse;

    if (!user) {
      return null;
    }

    return data ? user[data] : user;
  },
);
