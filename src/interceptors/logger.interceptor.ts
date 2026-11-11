import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';

import { tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {

  private readonly logger = new Logger('Interceptor');

  intercept(context: ExecutionContext, next: CallHandler) {

    this.logger.log('Interceptor : Before Controller');

    return next.handle().pipe(
      tap(() => {
        this.logger.log('Interceptor: After Controller');
      }),
    );
  }
}