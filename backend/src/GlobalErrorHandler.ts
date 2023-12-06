import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { error } from 'console';

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus ? exception.getStatus() : 500;

    exception.response['success'] = false;

    console.log({ exception: exception.response });

    // response.status(status).json({
    //   statusCode: status,
    //   message: exception.message || 'Internal Server Error',
    //   error: exception.constructor.name,
    // });
    response.status(status).json(exception.response);
  }
}
