import { Injectable, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ROLES_KEY } from '../decorators/roles.decorateur';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);


    // ✅ Attendre la résolution de `super.canActivate(context)`
    const isAuthenticated = await super.canActivate(context) as boolean;

    if (!isAuthenticated) {
      return false;
    }

    if (requiredRoles && (!request.user || !requiredRoles.includes(request.user.role))) {
      throw new ForbiddenException("🚨 Accès refusé : Rôle insuffisant !");
    }

    return true;
  }
}
