import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {


    console.log(`ApiKeyMiddleware: Checking API Key at ${new Date().toLocaleString()}`);
    const apiKey = req.headers['x-api-key'];

    console.log(`ApiKeyMiddleware: Received API Key: ${apiKey}`);
    if (apiKey!== undefined && apiKey !== 'my-secret-api-key-123') {
      throw new UnauthorizedException('Invalid API Key');
    }else

    next();
  }
}