import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { FileDashboardComponent } from './components/file-dashboard/file-dashboard.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { DragDirective } from './dragDrop.directive';

@NgModule({
  declarations: [AppComponent, FileDashboardComponent, FileUploadComponent, DragDirective],
  imports: [
    MatSlideToggleModule,
    BrowserModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    HttpClientModule, RouterModule.forRoot(appRoutes),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
