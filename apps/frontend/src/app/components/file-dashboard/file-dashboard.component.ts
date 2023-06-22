import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';

@Component({
  selector: 'data-sharing-server-file-dashboard',
  templateUrl: './file-dashboard.component.html',
  styleUrls: ['./file-dashboard.component.scss'],
})
export class FileDashboardComponent implements OnInit{





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

  @Input()
  token!: { content: string; creation: Date; };

  @Input()
  fileName = '';
  ngOnInit(): void {
    this.startTimer(
      this.updateTimeWithAmountToDelete(this.token.creation, 30)
    );  }

  calculateUntilDestroyed(creation: Date) {
    this.untilDestroyed = creation.getTime() - new Date(Date.now()).getTime();
    this.allocateTimeUnits(this.untilDestroyed);
  }

  reset() {
    location.reload();
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



}
