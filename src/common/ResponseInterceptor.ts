import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        message: 'Operation successful',
        data,
      })),
      catchError((err) => {
        // 直接抛出异常，让 GlobalExceptionFilter 处理
        return throwError(() => err);
      }),
    );
  }
}
