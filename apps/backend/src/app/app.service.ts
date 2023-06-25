import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { File } from './model/File.model';
import { v4 as uuidv4 } from 'uuid';
import { Content } from './model/Content.model';
import { Token } from './model/Token.model';
import { FilesService } from './files.service';

@Injectable()
export class AppService {

  constructor(private filesService: FilesService){}



  private files$$ = new BehaviorSubject<File[]>([]);
  public files$ = this.files$$.asObservable();

  getAllFiles(){
    return this.filesService.getAll();
  }

  deleteByToken(token: string){
    return this.filesService.deleteByToken(token);
  }

  getFileByToken(tokenCode: any, deleteFile: boolean){
  const file = this.filesService.getByToken(tokenCode);

  if(!file) throw new HttpException('Does not exist', HttpStatus.NOT_FOUND);
    if (deleteFile) this.filesService.delete(file.id)

    return file;

  }

  save(content: Content){
    const newFile = this.convertToFile(content);

    this.filesService.add(newFile);

    setTimeout(() => this.filesService.delete(newFile.id), this.calculateTimerLength(30));
    return newFile.token;
  }

  private convertToFile(content: Content){
   return{
      id: uuidv4(),
      name: content.originalname,
      content: Buffer.from(content.buffer),
      uploadDate: new Date(Date.now()),
      token: this.generateToken(),
    };
  }

  private generateToken(): Token {
    return {
      content: Math.floor(10000 + Math.random() * 90000).toString(),
      creation: new Date(Date.now()),
    };
  }

  private calculateTimerLength(min: number){
    return min * 60 * 1000
   }



}
