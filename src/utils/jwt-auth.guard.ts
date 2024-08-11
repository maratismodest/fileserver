import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const parsed = authHeader.split(' ');
      const bearer = parsed[0];
      const token = parsed[1];
      console.log('parsed', parsed);

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'User is unauthorized: no Bearer Token',
          status: 401,
        });
      }

      const user = this.jwtService.verify(token);
      console.log('user', user);
      req.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException({
        message: 'User is unauthorized:',
        status: 401,
      });
    }
  }
}
