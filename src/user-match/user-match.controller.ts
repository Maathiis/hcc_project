import { Controller, Post, Get, UseGuards, Param, ParseIntPipe, Body, Request } from '@nestjs/common';
import { UserMatchService } from './user-match.service';
import { JwtAuthGuard } from '../guards/auth.guard';


@Controller('user-match')
export class UserMatchController {
  constructor(private readonly userMatchService: UserMatchService) {}

  @UseGuards(JwtAuthGuard)
  @Post('inscrire')
  async inscrireUser(@Request() req, @Body() inscriptionDto: { matchId: number }) {
    return this.userMatchService.inscrireUserAuMatch(req.user.id, inscriptionDto.matchId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('desinscrire')
  async desinscrireUser(@Request() req, @Body() desinscriptionDto: { matchId: number }) {
    return this.userMatchService.desinscrireUserDuMatch(req.user.id, desinscriptionDto.matchId);
  }

  @Get('all')
  async getAllUsersWithMatches() {
    return this.userMatchService.getAllUsersWithMatches();
  }

  @Get(':userId')
  async getUserWithMatches(@Param('userId', ParseIntPipe) userId: number) {
    return this.userMatchService.getUserWithMatches(userId);
  }
}
