import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'data-sharing-server-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('fileUpload')
  private fileUpload!: ElementRef<HTMLInputElement>;

  isUploaded = false;

  constructor(private dataService: DataService) {}

  token: { content: string; creation: Date } | undefined = undefined;

  fileName = '';



  initFileUpload() {
    if (!this.isUploaded) {
      this.isUploaded = true;
      this.fileUpload.nativeElement.click();
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];


    if (file) {
      this.fileName = file.name;
      this.dataService.uploadFile(file).subscribe((data: any) => {
        this.token = {
          content: data.content,
          creation: new Date(data.creation),
        };
      });
    }
  }
}
