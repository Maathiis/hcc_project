import { Module } from '@nestjs/common';
import { JoueurService } from './joueur.service';
import { JoueurController } from './joueur.controller';

@Module({
  providers: [JoueurService],
  controllers: [JoueurController]
})
export class JoueurModule {}
