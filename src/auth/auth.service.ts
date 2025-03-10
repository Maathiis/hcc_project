import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from '../auth/auth.entity';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,

        @InjectRepository(AuthEntity)
        private authenticationRepository: Repository<AuthEntity>
    ) { }

    async signup(nom: string, prenom: string, email: string, password: string) {
        try {
            // Vérifier si l'email existe déjà
            const existingUser = await this.authenticationRepository.findOneBy({ email });
            if (existingUser) {
                return {
                    success: false,
                    message: 'Cet email est déjà utilisé. Veuillez en choisir un autre.'
                };
            }
    
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
    
            await this.authenticationRepository.save(newAuth);
    
            return {
                success: true,
                message: 'Votre compte a bien été créé, il sera validé par un administrateur.'
            };
    
        } catch (error) {
            console.error('Erreur lors de l’inscription:', error);
    
            return {
                success: false,
                message: 'Une erreur est survenue lors de la création de votre compte. Veuillez réessayer plus tard.'
            };
        }
    }
    

    async signin(email: string, password: string) {
        try {
            const user = await this.authenticationRepository.findOne({ where: { email } });
            const isAuthenticated = await bcrypt.compare(password, user.password);

            if (!user || !isAuthenticated) {
                throw new UnauthorizedException('Identifiant');
            }

            if (!user.validateUser) {
                throw new UnauthorizedException('Votre compte n\'a pas encore été validé par un administrateur');
            }

            const secret = this.configService.get<string>('JWT_SECRET');
            const token = this.jwtService.sign(
                { login: user.email, role: user.role, id: user.id },
                { secret, expiresIn: '3h' }
            );

            return {
                success: true,
                message: 'Connexion réussie',
                token,
                user: { id: user.id, email: user.email, role: user.role },
            };
        } catch (error) {
            throw new UnauthorizedException(error.message || 'Erreur de connexion');
        }
    }
}