import {
  Bind,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { Content } from './model/Content.model';

@Controller()
export class AppController {

  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
  ) {
  }

  @Get('/file/:token')
  currentFileToken(@Param() tokenCode: any) {
    return this.appService.getFileByToken(tokenCode);
  }

  @Get()
  getAllData() {
    return this.appService.getAllFiles();
  }


  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @Bind(UploadedFile())
  upload(file: Content) {
    return this.appService.save(file)
  }

  @Delete('/file/:token')
  delete(@Param() tokenCode: any){
    return this.appService.deleteByToken(tokenCode.token);
  }


}
