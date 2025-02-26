import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMatch } from './user-match.entity';
import { UserMatchService } from './user-match.service';
import { UserMatchController } from './user-match.controller';
import { User } from '../user/user.entity';
import { Match } from '../match/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserMatch, User, Match])], // ✅ Correction ici
  providers: [UserMatchService],
  controllers: [UserMatchController],
  exports: [UserMatchService], // ✅ Ajouté si besoin dans d'autres modules
})
export class UserMatchModule {}
