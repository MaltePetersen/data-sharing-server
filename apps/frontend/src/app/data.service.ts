import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class DataService  {

    //http://20.234.11.142:3000
    private api = "http://localhost:3000"

  constructor(private http: HttpClient) {}


  uploadFile(file: File): Observable<any>{

    const formData = new FormData();

    formData.append('file', file);

    const upload$ = this.http.post(`${this.api}/api`, formData);

    return upload$
  }

}
