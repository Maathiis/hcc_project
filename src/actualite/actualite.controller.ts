import { Controller, Get, Request, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ActualiteService } from './actualite.service';
import { JwtAuthGuard } from '../guards/auth.guard';


@Controller('actualite')
export class ActualiteController {
    constructor(private readonly actualiteService: ActualiteService) {}

    // --------------------------------------------------
    // 4.3 Gestion des actualités  
    // --------------------------------------------------

    // Seul les adhérents ayant le rôle « contributeur » peuvent publier des actualités.
    @UseGuards(JwtAuthGuard)
    @Post('create')
    createNews(@Request() req, @Body() body: { titre: string; data: string }) {
        return this.actualiteService.createNews(req.user.id, body.titre, body.data);
    }

    // L’API doit être capable de retourner l’ensembles des actualités (toutes les infos + auteur).
    @Get()
    getAllNews() {
        return this.actualiteService.getAllNews();
    }

    // L’API doit être capable de retourner une actualité particulière (toutes les infos + auteur).
    @Get(':id')
    getNewsById(@Param('id') id: number) {
        return this.actualiteService.getNewsById(id);
    }
}
