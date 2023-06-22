import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesService } from './files.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, FilesService],
})
export class AppModule {}
