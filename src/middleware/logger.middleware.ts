import {
  Injectable,
  NestMiddleware,
  Logger,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      `Middleware [request]: ${new Date().toLocaleString()} - ${req.method} ${req.url}`,
    );

    next();

    res.on('finish', () => {
      this.logger.log(
        `Middleware [response]: ${new Date().toLocaleString()} - ${req.method} ${req.url} - ${res.statusCode}`,
      );
    });
  }
}