import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from '../auth/auth.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,

        @InjectRepository(AuthEntity)
        private authenticationRepository: Repository<AuthEntity>
    ) { }

    async signup(nom: string, prenom: string, email: string, password: string) {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        const dateInscription = new Date();
        const dateModification = new Date();
        const newAuth = this.authenticationRepository.create({
            nom: nom,
            prenom: prenom,
            email: email,
            password: hash,
            role: 'nonverifie',
            dateInscription: dateInscription,
            dateModification: dateModification,
            validateUser: false,
        });

        return this.authenticationRepository.save(newAuth);
    }

    async signin(email: string, password: string) {
        const user = await this.authenticationRepository.findOne({
            where: {
                email: email,
            },
        });

        const isAuthenticated = await bcrypt.compare(password, user.password);

        if (isAuthenticated) {
            console.log(this.configService.get<string>('JWT_SECRET'))
            const secret = this.configService.get<string>('JWT_SECRET');
            console.log(secret);
            return this.jwtService.sign(
                {
                    login: user.email,
                    role: user.role
                },
                { secret, expiresIn: '1h' }
            );
        }

        return;

    }
}

// Un compte se créé, il ne peut pas se log, il faut aller sur le compte de l'admin, et mettre /verify/ID/Roles, le compte pourra alors se log.