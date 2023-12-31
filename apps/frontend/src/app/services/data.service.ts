import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Token } from '../model/token.model';
import { State } from '../model/stats.model';


@Injectable({
  providedIn: 'root',
})
export class DataService  {

  private api = "http://20.234.11.142:3000"
    //private api = "http://localhost:3000"

  constructor(private http: HttpClient) {}


  uploadFile(file: File): Observable<any>{

    const formData = new FormData();

    formData.append('file', file);

    const upload$ = this.http.post(`${this.api}/api`, formData);

    return upload$
  }

  checkIfFileExists(token: string){
    return this.http.get(`${this.api}/api/file/${token}?delete=false`)
  }

  deleteFile(token: string){
   return this.http.delete(`${this.api}/api/file/${token}`)
  }
  persistName(name: string){
    localStorage.setItem('fileName', name)
    }

  persistToken(token: Token | null){
    if(token) localStorage.setItem('token', JSON.stringify(token))
   else localStorage.clear();
  }

  getState(): State | null{
    const token = localStorage.getItem('token')
    const fileName = localStorage.getItem('fileName');
    if(token && fileName) {
    const tokenData =JSON.parse(token)
      return{
      token: {content: tokenData.content,
              creation: new Date(tokenData.creation)},
      fileName: fileName
    }}
    return null
  }


}
