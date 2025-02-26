import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { JwtAuthGuard } from '../guards/auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // --------------------------------------------------
  // 4.2 Gestion des adhérents 
  // --------------------------------------------------

  // L’API doit être capable de retourner les infos de l’ensemble des adhérents (nom, prénom, date d’inscription, matchs auxquels ils participent)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // L’API doit être capable de retourner les infos d’un adhérent particulier (nom, prénom, date d’inscription, matchs auxquels il participe)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }
}
