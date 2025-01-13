import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';
import { env } from 'process';

@Module({
  imports: [
    JwtModule.register({
      secret: env.JWT_SECRET, 
      signOptions: { expiresIn: '1h' },
    }),
    ConfigModule,
    TypeOrmModule.forFeature([AuthEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

