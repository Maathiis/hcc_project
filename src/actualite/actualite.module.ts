import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActualiteService } from './actualite.service';
import { ActualiteController } from './actualite.controller';
import { Actualite } from './actualite.entity';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([Actualite, User])],
  controllers: [ActualiteController],
  providers: [ActualiteService, JwtService],
  exports: [ActualiteService],
})
export class ActualiteModule {}
