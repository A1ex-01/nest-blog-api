import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import BusinessErrorException, {
  errorCodeEnum,
} from './BusinessErrorException';

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
        if (err instanceof BusinessErrorException) return of(err);
        return of(BusinessErrorException.throwError(errorCodeEnum.SYSTEMERROR));
      }),
    );
  }
}
