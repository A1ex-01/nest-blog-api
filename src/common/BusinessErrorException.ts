export enum errorCodeEnum {
  BAD_REQUEST = 40000,
  SYSTEMERROR = 50000,
  UNAUTHORIZED = 40100,
}
export const codeMessage: Record<errorCodeEnum, string> = {
  [errorCodeEnum.BAD_REQUEST]: 'Bad Request',
  [errorCodeEnum.SYSTEMERROR]: 'System Error',
  [errorCodeEnum.UNAUTHORIZED]: 'Unauthorized',
};
export function getCodeMessage(code: errorCodeEnum) {
  return codeMessage[code];
}
export default class BusinessErrorException extends Error {
  code: errorCodeEnum;
  data = null;
  success = false;
  constructor(code: errorCodeEnum, message: string) {
    super();
    this.message = message;
    this.code = code;
  }
  public static throwError(code: errorCodeEnum);
  public static throwError(
    code: errorCodeEnum,
    message: string,
  ): BusinessErrorException;
  public static throwError(code: errorCodeEnum, message?: string) {
    if (!message) return new BusinessErrorException(code, getCodeMessage(code));
    return new BusinessErrorException(code, message);
  }
}
