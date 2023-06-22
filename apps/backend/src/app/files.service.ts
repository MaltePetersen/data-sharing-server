import { BehaviorSubject } from 'rxjs';
import { File } from './model/File.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {

  private files$$ = new BehaviorSubject<File[]>([]);
  public files$ = this.files$$.asObservable();

  getAll(){
    return this.files$$.value;
  }

  getByToken(tokenCode: any){
    return this.files$$.value.find(
      (file: File) => file.token.content === tokenCode.token
    );
  }


   add(file: File){
    const files = this.getAll();
    files.push(file);
    this.files$$.next(files);
  }


   delete(fileId) {
    const files = this.getAll();
    const newFiles = files.filter((file: File) => file.id !== fileId);
    this.files$$.next(newFiles);
  }

  deleteByToken(token: string){
    const files = this.getAll();
    const newFiles = files.filter((file: File) => file.token.content !== token);
    this.files$$.next(newFiles);
  }

}
