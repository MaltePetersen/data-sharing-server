import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
