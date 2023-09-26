import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('EXCEPTION');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    const { method, originalUrl } = req;

    const message = `${method} ${originalUrl} ${exception.getStatus()} ${
      exception.response.name || exception.name
    }`;

    if (exception.getStatus() >= 500) this.logger.error(message);
    if (exception.getStatus() >= 400) this.logger.warn(message);

    res.status(exception.getStatus()).json({
      statusCode: exception.getStatus(),
      error: exception.response.name || exception.name,
      message: exception.response.message || exception.message,
      errors: exception.response.errors || exception.errors,
    });
  }
}
