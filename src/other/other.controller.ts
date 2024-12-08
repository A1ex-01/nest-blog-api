import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OtherService } from './other.service';
@ApiTags('其他')
@Controller('others')
export class OtherController {
  constructor(private readonly otherService: OtherService) {}

  @ApiOperation({ summary: '测试错误拦截' })
  @Get('/testError')
  testError() {
    return this.otherService.sendError();
  }
}
