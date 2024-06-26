import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // const request = ctx.getRequest();

    // console.log('exception', exception);
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorResponse: any = {
      statusCode: status,
      message: 'Internal server error',
      error: 'Internal Server Error',
    };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();
      errorResponse =
        typeof response === 'string'
          ? {
              message: response,
              error: exception.message,
            }
          : response;
    } else if ((exception as any)?.message) {
      errorResponse.message = (exception as any).message;
    }

    response.status(status).json({
      statusCode: status,
      //   timestamp: new Date().toISOString(),
      //   path: request.url,
      status: false,
      error: errorResponse.error,
      message: errorResponse.message,
    });
  }
}
