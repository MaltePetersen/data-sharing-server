import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, interval, switchMap, take } from 'rxjs';
import { Token } from '../model/token.model';
import { DataService } from './data.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class FileService  {

  constructor(private dataService: DataService, private router: Router){
    interval(1 * 10 * 1000).subscribe(()=> this.lookUpfileStatus())

  }
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
lookUpfileStatus(){
  this.token$.pipe(take(1),filter(data => data !== null), switchMap((data)=> this.dataService.checkIfFileExists(data?.content as string).pipe(  catchError((obs) => {
    this.dataService.persistToken(null)
    this.router.navigate(['/'])
    return obs;
    }))),
)
  .subscribe()
}

}
