import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/user.module';
import { ActualiteModule } from './actualite/actualite.module';
import { MatchModule } from './match/match.module';
import { User } from './user/user.entity';
import { Match } from './match/match.entity';
import { Actualite } from './actualite/actualite.entity';
import { UserMatch } from './user-match/user-match.entity';
import { AuthModule } from './auth/auth.module';
import { AuthEntity } from './auth/auth.entity';
import { ConfigModule } from '@nestjs/config';
import { UserMatchModule } from './user-match/user-match.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [User, Match, Actualite, AuthEntity, UserMatch],
    synchronize: true,
  }), 
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  UsersModule, ActualiteModule, MatchModule, AuthModule, UserMatchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
