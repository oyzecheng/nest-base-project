import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Pagination = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const query = request.query;

    const page = +query.page || body.page || 1;
    const pageSize = +query.pageSize || body.pageSize || 10;

    const pagination = {
      page,
      pageSize,
      skip: (page - 1) * pageSize || 0,
    };

    if (data) return pagination[data];
    return pagination;
  },
);
