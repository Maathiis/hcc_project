import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchService } from './match.service';                                                              
import { MatchController } from './match.controller';
import { Match } from './match.entity';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([Match, User])],
  controllers: [MatchController],
  providers: [MatchService, JwtService],
  exports: [MatchService],
})
export class MatchModule {}
