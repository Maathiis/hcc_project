import { Module } from '@nestjs/common';
import { ActualiteController } from './actualite.controller';
import { ActualiteService } from './actualite.service';

@Module({
  controllers: [ActualiteController],
  providers: [ActualiteService]
})
export class ActualiteModule {}
