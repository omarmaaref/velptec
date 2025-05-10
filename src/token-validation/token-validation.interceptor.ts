import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TokenValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Interceptor');
    const request = context.switchToHttp().getRequest();
    const authHeaderIfPresent = request.headers['authorization'];
    if(!authHeaderIfPresent)
      throw new UnauthorizedException('Authorization header missing');
    
    const [type, token] = authHeaderIfPresent.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization format');
    }
    
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new UnauthorizedException('Invalid token structure');
    }
    return next.handle();
  }
}
