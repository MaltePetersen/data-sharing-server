import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Token } from '../model/token.model';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root',
})
export class FileService  {

  constructor(private dataService: DataService){}
  private token$$ = new BehaviorSubject<Token | null>(null);
  public token$ = this.token$$.asObservable();

  private fileName$$ = new BehaviorSubject<string>('');
  public fileName$ = this.fileName$$.asObservable()

  updateToken(token: Token | null){
    this.token$$.next(token)
    this.dataService.persistToken(token)

 }

  updateFileName(fileName: string){
    this.fileName$$.next(fileName);
    this.dataService.persistName(fileName)
  }


}
