import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ActualiteModule } from './actualite/actualite.module';
import { MatchModule } from './match/match.module';
import { UserEntity } from './user/user.entity';
import { MatchEntity } from './match/match.entity';
import { ActualiteEntity } from './actualite/actualite.entity';
import { AuthModule } from './auth/auth.module';
import { CoachModule } from './coach/coach.module';
import { JoueurModule } from './joueur/joueur.module';
import { ContributeurModule } from './contributeur/contributeur.module';
import { AuthEntity } from './auth/auth.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [UserEntity, MatchEntity, ActualiteEntity, AuthEntity],
    synchronize: true,
  }), 
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  UserModule, ActualiteModule, MatchModule, AuthModule, CoachModule, JoueurModule, ContributeurModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
