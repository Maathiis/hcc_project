import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorateur';
import { User } from '../user/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<User['role']>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // Si aucun rôle requis, autoriser l'accès
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    if (!user) {
      throw new ForbiddenException('Accès interdit');
    }

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException(`Accès interdit. Rôle(s) requis : ${Array.isArray(requiredRoles) ? requiredRoles.join(', ') : requiredRoles}`);
    }

    return true;
  }
}