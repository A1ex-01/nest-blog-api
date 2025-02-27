import { Injectable } from '@nestjs/common';
import BusinessErrorException, {
  errorCodeEnum,
} from 'src/common/BusinessErrorException';

@Injectable()
export class OtherService {
  constructor() {}
  sendError() {
    throw BusinessErrorException.throwError(errorCodeEnum.UNAUTHORIZED);
  }
}
