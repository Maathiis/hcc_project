import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthDto } from '../auth/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() authDto: AuthDto) {
        const generatedToken = await this.authService.signin(authDto.email, authDto.password);
        return {
            access_token: generatedToken
        };
    }

    @Post('register')
    async register(@Body() authDto: AuthDto) {
        await this.authService.signup(authDto.nom, authDto.prenom, authDto.email, authDto.password);
        return;
    }
}
