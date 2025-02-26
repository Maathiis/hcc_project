import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthDto } from '../auth/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    // --------------------------------------------------
    // 4.1 Authentification 
    // --------------------------------------------------

    //Les adhérents du club peuvent s’authentifier avec un email et un mot de passe. Il reçoit un token JWT pour accéder aux fonctionnalités réservées aux adhérents
    @Post('login')
    async login(@Body() authDto: AuthDto) {
        const generatedToken = await this.authService.signin(authDto.email, authDto.password);
        return {
            access_token: generatedToken
        };
    }

    // Un utilisateur peut se créer un compte adhérent, son compte sera validé par le club, son compte aura soit le rôle « coach », soit « contributeur », soit « joueur »
    @Post('register')
    async register(@Body() authDto: AuthDto) {
        await this.authService.signup(authDto.nom, authDto.prenom, authDto.email, authDto.password);
        return;
    }
}
