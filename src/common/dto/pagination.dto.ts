import { IsNumber, Min } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @Min(0)
  page?: number;

  @IsNumber()
  @Min(0)
  pageSize?: number;

  @IsNumber()
  @Min(0)
  skip?: number;
}
