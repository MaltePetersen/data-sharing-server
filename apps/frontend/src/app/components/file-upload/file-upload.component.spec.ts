import { TestBed } from '@angular/core/testing';
import { FileUploadComponent } from './file-upload.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let component: FileUploadComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FileUploadComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
