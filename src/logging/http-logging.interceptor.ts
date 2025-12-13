import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService } from './logging.service';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, query, body } = request;
    const startTime = Date.now();

    this.loggingService.logRequest(method, url, query, body);

    return next.handle().pipe(
      tap({
        next: () => {
          const response = context.switchToHttp().getResponse();
          const statusCode = response.statusCode;
          const responseTime = Date.now() - startTime;

          this.loggingService.logResponse(
            method,
            url,
            statusCode,
            responseTime,
          );
        },
        error: () => {
          const response = context.switchToHttp().getResponse();
          const statusCode = response.statusCode || 500;
          const responseTime = Date.now() - startTime;

          this.loggingService.logResponse(
            method,
            url,
            statusCode,
            responseTime,
          );
        },
      }),
    );
  }
}
