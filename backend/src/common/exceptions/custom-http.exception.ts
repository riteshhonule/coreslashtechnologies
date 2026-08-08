import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomHttpException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    public readonly errors: any[] = [],
  ) {
    super(
      {
        success: false,
        statusCode: status,
        message,
        errors,
      },
      status,
    );
  }
}
