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

@NgModule({
  declarations: [AppComponent, FileDashboardComponent, FileUploadComponent],
  imports: [
    MatSlideToggleModule,
    BrowserModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
