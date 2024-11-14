import { Module } from '@nestjs/common';
import { ContributeurService } from './contributeur.service';
import { ContributeurController } from './contributeur.controller';

@Module({
  providers: [ContributeurService],
  controllers: [ContributeurController]
})
export class ContributeurModule {}
