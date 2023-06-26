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

  constructor(private dataService: DataService,private router: Router, private fileService: FileService ) {}

  token: { content: string; creation: Date } | undefined = undefined;

  fileName = '';
  filesDropped(event: any) {
    const file: File = event[0].file;
    if (file) this.uploadFile(file)}


  initFileUpload() {
      this.fileUpload.nativeElement.click();
  }

  uploadFile(file: File){
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) this.uploadFile(file)
  }
}
