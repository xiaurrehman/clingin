import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";


@Catch(HttpException)
export class HTTPExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();

        const errorMessage = {
            statusCode : status,
            timeStamp : new Date().toISOString(),
            path : request.url,
            message :
                typeof exceptionResponse === 'string' ? exceptionResponse : (exceptionResponse as any).message || 'HTTP exception'
        }
        response.status(status).json(errorMessage);
    }
}

// Catch-all filter for any unhandled exceptions
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException 
      ? exception.getStatus() 
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorMessage = exception instanceof HttpException
      ? exception.getResponse()
      : { message: 'Internal server error' };

    console.error('Unhandled exception:', exception);

    response.status(status).json({
      statusCode: status,
      timeStamp: new Date().toISOString(),
      path: request.url,
      message: typeof errorMessage === 'string' ? errorMessage : (errorMessage as any).message || 'Internal server error',
    });
  }
}