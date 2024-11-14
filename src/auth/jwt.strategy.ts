import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'YOUR_SECRET_KEY',  // Utilisez votre clé secrète pour vérifier les tokens
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findOne(payload.sub);  // Récupérer l'utilisateur à partir de l'ID du payload
    return user;  // L'utilisateur sera ajouté à la requête
  }
}
    