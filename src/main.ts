import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/ResponseInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // 允许所有来源
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // 允许的HTTP方法
    allowedHeaders: '*', // 允许所有请求头
  });
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(8004);
}
bootstrap();
