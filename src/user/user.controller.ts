import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from 'src/dto';
import { LoginGuard } from 'src/Guard/LoginGuard';
import { UserService } from './user.service';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOperation({ summary: '登录' })
  @Post('login')
  login(@Body() user: LoginUserDto) {
    console.log('🚀 ~ UserController ~ login ~ user:', user);
    return this.userService.login(user);
  }
  @ApiOperation({ summary: '获取用户信息' })
  @Get('getInfo')
  @UseGuards(LoginGuard)
  getInfo(
    @Req()
    req: {
      user: {
        id: string;
        username: string;
      };
    },
  ) {
    console.log('🚀 ~ UserController ~ getInfo ~ req:', req);
    return this.userService.getInfo(req.user.id);
  }
  @ApiOperation({ summary: '通过 uuid 获取用户信息' })
  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.userService.findOne(uuid);
  }
}
