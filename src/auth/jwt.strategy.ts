import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // ✅ Extrait le JWT du header Authorization
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your_secret_key', // Assure-toi que c'est la même clé que dans JwtModule
    });
  }

  async validate(payload: { id: number }) {
    const user = await this.usersRepository.findOne({ where: { id: payload.id } });
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }
    return user; // Ajoute l'utilisateur à req.user
  }
}

