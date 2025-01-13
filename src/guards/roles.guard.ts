import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRole } from "../user/user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return false;  // Si aucune restriction n'est définie, la route n'est accessible à persone
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;  // Assurez-vous que l'utilisateur est correctement attaché à la requête (par exemple via un JWT)

    return requiredRoles.includes(user.role);  // Vérifie si le rôle de l'utilisateur est dans les rôles autorisés
  }
}

/*@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return false;  // Si aucune restriction n'est définie, la route n'est accessible à persone
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;  // Assurez-vous que l'utilisateur est correctement attaché à la requête (par exemple via un JWT)
    if (!role || !requiredRoles.includes(role)) {
      throw new UnauthorizedException();
    }
    return true; 
  }
}*/
