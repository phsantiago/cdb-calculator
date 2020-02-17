import { Module } from '@nestjs/common';
import { Controller } from './cdb/controller';
import { AppController } from './app/controller';
import { CdbService } from './cdb/service';
import { AppService } from './app/service';

@Module({
  imports: [],
  controllers: [CdbController, AppController],
  providers: [CdbService, AppService],
})
export class AppModule {}
