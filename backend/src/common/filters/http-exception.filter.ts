import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { REQUEST_ID_HEADER } from '../middleware/request-id.middleware';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const requestId = (request.headers[REQUEST_ID_HEADER] as string) || (request as any).id || 'N/A';

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: any[] = [];

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const respObj = exceptionResponse as Record<string, any>;
        message = respObj.message || exception.message;
        
        if (Array.isArray(respObj.message)) {
          errors = respObj.message;
          message = 'Validation failed';
        } else if (respObj.errors && Array.isArray(respObj.errors)) {
          errors = respObj.errors;
        }
      }
    } else if (exception && typeof exception === 'object') {
      message = exception.message || 'Internal server error';
      this.logger.error(
        `[${requestId}] Unhandled Exception: ${message}`,
        exception.stack,
      );
    }

    this.logger.warn(
      `[${requestId}] HTTP ${statusCode} [${request.method}] ${request.url} - ${message}`,
    );

    response.status(statusCode).json({
      success: false,
      statusCode,
      message,
      errors,
      requestId,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
