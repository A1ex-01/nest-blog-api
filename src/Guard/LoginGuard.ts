import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import BusinessErrorException, {
  errorCodeEnum,
} from 'src/common/BusinessErrorException';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const authorization = request.header('Authorization') || '';

    const bearer = authorization.split(' ');
    console.log('🚀 ~ LoginGuard ~ bearer:', bearer);

    if (!bearer || bearer.length < 2) {
      throw BusinessErrorException.throwError(errorCodeEnum.UNAUTHORIZED);
    }

    const token = bearer[1];

    try {
      const info = this.jwtService.verify(token);
      console.log('🚀 ~ LoginGuard ~ info:', info);
      (request as any).user = info.user;
      return true;
    } catch (e: any) {
      console.log('🚀 ~ LoginGuard ~ e:', e);
      throw BusinessErrorException.throwError(errorCodeEnum.UNAUTHORIZED);
    }
  }
}
