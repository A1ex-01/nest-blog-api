import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class TimerMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`${req.method} ${req.url} - ${duration}ms`);
    });
    next();
  }
}
