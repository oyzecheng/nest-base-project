import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Pagination = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    body.page = body.page || 1;
    body.pageSize = body.pageSize || 10;
    body.skip = (body.page - 1) * body.pageSize || undefined;

    if (data) return body[data];

    return body;
  },
);
