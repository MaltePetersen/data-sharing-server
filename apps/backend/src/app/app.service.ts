import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { File } from './model/File.model';
import { v4 as uuidv4 } from 'uuid';
import { Content } from './model/Content.model';
import { Token } from './model/Token.model';

@Injectable()
export class AppService {

  timerDuration = 30 * 60 * 1000; // 30 minutes in milliseconds

  private files$$ = new BehaviorSubject<File[]>([]);
  public files$ = this.files$$.asObservable();

  getAllFiles(){
    return this.files$$.value;
  }
  generateToken(): Token {
    return {
      content: Math.floor(10000 + Math.random() * 90000).toString(),
      creation: new Date(Date.now()),
    };
  }

  getFileByToken(tokenCode: any){
    const tokenExist = this.files$$.value.find(
      (file: File) => file.token.content === tokenCode.token
    );
    if (tokenExist) {
      this.deleteFile(tokenExist.id)
      return tokenExist;
    }
    throw new HttpException('Does not exist', HttpStatus.NOT_FOUND);
  }

  deleteFile(fileId) {
    console.log('deletion in Progress');
    const files = this.files$$.value;
    const newFiles = files.filter((file: File) => file.id !== fileId);
    this.files$$.next(newFiles);
  }



  save(content: Content){
    const token = this.generateToken();
    const fileToSave = {
      id: uuidv4(),
      name: content.originalname,
      content: Buffer.from(content.buffer),
      uploadDate: new Date(Date.now()),
      token: token,
    };
    const files = this.files$$.value;

    files.push(fileToSave);
    this.files$$.next(files);
    setTimeout(() => this.deleteFile(fileToSave.id), this.timerDuration);
    return token;
  }
}
