import {
  Bind,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { File } from './File.model';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Token } from './Token.model';

@Controller()
export class AppController {
  timerDuration = 30 * 60 * 1000; // 30 minutes in milliseconds

  files$$ = new BehaviorSubject([]);
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
    private schedulerRegistry: SchedulerRegistry
  ) {
    this.files$$.subscribe((data) => console.log(data));
  }

  generateToken(): Token {
    return {
      content: Math.floor(10000 + Math.random() * 90000).toString(),
      creation: new Date(Date.now()),
    };
  }
  @Get('/file/:token')
  currentFileToken(@Param() tokenCode: any) {
    console.log(tokenCode);
    const tokenExist = this.files$$.value.find(
      (file: File) => file.token.content === tokenCode.token
    );
    if (tokenExist) {
      return tokenExist;
    }
    throw new HttpException('Does not exist', HttpStatus.NOT_FOUND);
  }

  @Get()
  getData() {
    return this.files$$.value;
  }
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @Bind(UploadedFile())
  uploadFile(file: { originalname: string; buffer: any }) {
    const token = this.generateToken();
    const fileToSave = {
      id: uuidv4(),
      name: file.originalname,
      content: Buffer.from(file.buffer),
      uploadDate: new Date(Date.now()),
      token: token,
    };
    const files = this.files$$.value;

    files.push(fileToSave);
    this.files$$.next(files);
    setTimeout(() => this.deleteFile(fileToSave.id), this.timerDuration);
    return token;
  }

  deleteFile(fileId) {
    console.log('deletion in Progress');
    const files = this.files$$.value;
    const newFiles = files.filter((file: File) => file.id !== fileId);
    this.files$$.next(newFiles);
  }
}
