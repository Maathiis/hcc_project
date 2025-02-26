import { Controller, Get, Post, Param, Body, UseGuards, ParseIntPipe, Request } from '@nestjs/common';
import { MatchService } from './match.service';
import { JwtAuthGuard } from '../guards/auth.guard';
//import { Roles } from '../decorators/roles.decorateur';
//import { RolesGuard } from '../guards/roles.guard';
//import { UserRole } from '../user/user.entity';
import { RegisterMatchDto } from './dto/register-match.dto';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  // Seul un coach peut créer un match
  @UseGuards(JwtAuthGuard)
  @Post("create")
  //@UseGuards(RolesGuard)
  //@Roles(UserRole.COACH)
  createMatch(@Request() req, @Body() dto: RegisterMatchDto) {
    return this.matchService.createMatch(req.user.id, dto.intitule, dto.dateMatch, dto.adversaire);
  }

  // Seul un coach peut modifier le score du match
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  //@UseGuards(RolesGuard)
  //@Roles(UserRole.COACH)
  updateMatch(@Request() req, @Param('id', ParseIntPipe) id: number, @Body() dto: RegisterMatchDto) {
    return this.matchService.updateMatch(req.user.id, id, dto.score, dto.scoreFinal);
  }

  // Retourne la liste de tous les matchs avec participants
  @Get('allMatch')
  findAllMatch() {
    return this.matchService.getAllMatchs();
  }

  // Retourne les infos d’un match spécifique avec participants
  @Get('infoMatch/:id')
  findOneMatch(@Param('id', ParseIntPipe) id: number) {
    return this.matchService.getOneMatch(id);
  }
}
