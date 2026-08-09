import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as crypto from 'crypto';

export const REQUEST_ID_HEADER = 'x-request-id';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const incomingId = req.headers[REQUEST_ID_HEADER] as string;
    const requestId =
      incomingId && incomingId.trim().length > 0
        ? incomingId.trim()
        : crypto.randomUUID();

    req.headers[REQUEST_ID_HEADER] = requestId;
    (req as any).id = requestId;
    res.setHeader(REQUEST_ID_HEADER, requestId);

    next();
  }
}
