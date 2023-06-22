import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Token } from '../model/token.model';


@Injectable({
  providedIn: 'root',
})
export class FileService  {

  private token$$ = new BehaviorSubject<Token | null>(null);
  public token$ = this.token$$.asObservable();

  private fileName$$ = new BehaviorSubject<string>('');
  public fileName$ = this.fileName$$.asObservable()

  updateToken(token: Token | null){
    this.token$$.next(token)
  }

  updateFileName(fileName: string){
    this.fileName$$.next(fileName);
  }


}
