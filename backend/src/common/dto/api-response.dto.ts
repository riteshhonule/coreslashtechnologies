import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T = any> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Operation completed successfully' })
  message: string;

  @ApiProperty({ required: false })
  data?: T;

  @ApiProperty({ example: '2026-08-08T00:00:00.000Z' })
  timestamp?: string;
}

export class ApiErrorResponseDto {
  @ApiProperty({ example: false })
  success: false;

  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Bad Request' })
  message: string;

  @ApiProperty({ example: [], isArray: true })
  errors: any[];

  @ApiProperty({ example: '2026-08-08T00:00:00.000Z' })
  timestamp: string;

  @ApiProperty({ example: '/api/v1/health' })
  path: string;
}
