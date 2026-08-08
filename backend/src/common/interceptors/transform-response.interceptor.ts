import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IApiResponse } from '@core/interfaces/api-response.interface';

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, IApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IApiResponse<T>> {
    return next.handle().pipe(
      map((res) => {
        // If response is already structured with success field
        if (res && typeof res === 'object' && 'success' in res) {
          return {
            timestamp: new Date().toISOString(),
            ...res,
          };
        }

        let message = 'Operation successful';
        let data = res;

        // If response object has custom message & data key
        if (res && typeof res === 'object' && ('message' in res || 'data' in res)) {
          message = res.message || message;
          data = res.data !== undefined ? res.data : res;
        }

        return {
          success: true,
          message,
          data: data ?? {},
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
