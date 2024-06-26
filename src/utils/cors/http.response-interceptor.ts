import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type IResult = {
  [key: string]: string | number;
};
type IResponse = {
  statusCode: number;
  status: boolean;
  result: Array<IResult> | IResult | string | number;
};

@Injectable()
export class HTTPResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse> {
    return next.handle().pipe(
      map((result) => {
        const payload = {
          statusCode: context.switchToHttp().getResponse().statusCode,
          status: true,
          result,
        };
        return payload;
      }),
    );
  }
}
