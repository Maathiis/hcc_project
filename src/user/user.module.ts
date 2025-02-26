import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { User } from './user.entity';
import { Match } from '../match/match.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, Match])],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
