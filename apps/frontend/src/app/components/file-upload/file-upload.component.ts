import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { FileService } from '../../services/files.service';

@Component({
  selector: 'data-sharing-server-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  @ViewChild('fileUpload')
  private fileUpload!: ElementRef<HTMLInputElement>;

  isUploaded = false;

  constructor(private dataService: DataService,private router: Router, private fileService: FileService ) {}

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
      this.fileService.updateFileName(this.fileName)
      this.dataService.uploadFile(file).subscribe((data: any) => {
        this.token = {
          content: data.content,
          creation: new Date(data.creation),
        };
        this.fileService.updateToken(this.token)
        this.router.navigate(['/dashboard'])
      });
    }
  }
}
