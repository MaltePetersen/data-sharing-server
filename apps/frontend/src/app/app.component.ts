import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { FileService } from './services/files.service';
import { state } from '@angular/animations';
import { Token } from '@angular/compiler';
import { Route, Router } from '@angular/router';
import { webSocket } from "rxjs/webSocket";

@Component({
  selector: 'data-sharing-server-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private dataService: DataService, private fileService: FileService, private router: Router){
 const state = dataService.getState()
    if(state && this.fileStillExists(state.token.creation)){
      fileService.updateFileName(state.fileName)
      fileService.updateToken(state.token)
      this.router.navigate(['/dashboard'])
    }
  }
  private fileStillExists(creation: Date){
    const deepCopy = new Date(JSON.parse(JSON.stringify(creation)));
    deepCopy.setMinutes(deepCopy.getMinutes() + 30);
    return (deepCopy.getTime() - new Date(Date.now()).getTime()) > 0
  }
}
