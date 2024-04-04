import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const jwtSecret = this.configService.get<string>('jwtSecret');

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeaderorCookie(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtSecret,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeaderorCookie(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    const cookieToken = request.cookies?.access_token;

    if (authHeader && typeof authHeader === 'string') {
      const [type, token] = authHeader.split(' ');
      if (type === 'Bearer' && token) {
        return token;
      }
    } else if (cookieToken) {
      return cookieToken;
    }

    return undefined;
  }
}
