import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import BusinessErrorException, {
  errorCodeEnum,
} from './BusinessErrorException';

@Catch() // 捕获所有异常
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log('🚀 ~ GlobalExceptionFilter ~ exception:', exception);
    const http = host.switchToHttp();
    const response = http.getResponse<Response>();

    // 处理字段
    // 处理 BusinessErrorException
    if (exception instanceof BusinessErrorException) {
      return response
        .status(200)
        .json(
          BusinessErrorException.throwError(exception.code, exception.message),
        );
    }

    // 处理 JWT 验证错误
    if (
      exception.name === 'JsonWebTokenError' ||
      exception.name === 'TokenExpiredError'
    ) {
      return response
        .status(200)
        .json(BusinessErrorException.throwError(errorCodeEnum.UNAUTHORIZED));
    }

    // 处理 HttpException
    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const res = exception.getResponse() as { message: string[] };
      return response.status(statusCode).json({
        code: statusCode,
        message: res?.message?.join
          ? res?.message?.join(',')
          : exception.message,
        success: false,
      });
    }

    // 处理其他未知异常
    console.error(exception);
    response.status(500).json({
      code: 50000,
      message: 'Internal Server Error',
      success: false,
    });
  }
}
