import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';

@Component({
  selector: 'data-sharing-server-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  public timeDifference = 0;
  public secondsToDday = 0;
  public minutesToDday = 0;
  public hoursToDday = 0;
  public daysToDday = 0;
  untilDestroyed = 0;
  token: { content: string; creation: Date } | undefined = undefined;

  fileName = '';

  constructor(private http: HttpClient) {}

  calculateUntilDestroyed(creation: Date) {
    this.untilDestroyed = creation.getTime() - new Date(Date.now()).getTime();
    this.allocateTimeUnits(this.untilDestroyed);
  }

  updateTimeWithAmountToDelete(creation: Date, min: number) {
    creation.setMinutes(creation.getMinutes() + min);
    return creation;
  }
  startTimer(creation: Date) {
    interval(1000).subscribe(() => {
      this.calculateUntilDestroyed(creation);
    });
  }

  private allocateTimeUnits(timeDifference: number) {
    this.secondsToDday = Math.floor(
      (timeDifference / this.milliSecondsInASecond) % this.SecondsInAMinute
    );
    this.minutesToDday = Math.floor(
      (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour)) %
        this.SecondsInAMinute
    );
    this.hoursToDday = Math.floor(
      (timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute)) %
        this.hoursInADay
    );
    this.daysToDday = Math.floor(
      timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute *
          this.hoursInADay)
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append('file', file);

      const upload$ = this.http.post('http://localhost:3000/api', formData);

      upload$.subscribe((data: any) => {
        this.token = {
          content: data.content,
          creation: new Date(data.creation),
        };
        this.startTimer(
          this.updateTimeWithAmountToDelete(this.token.creation, 30)
        );
      });
    }
  }
}