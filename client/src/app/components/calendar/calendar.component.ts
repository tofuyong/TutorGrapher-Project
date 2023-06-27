import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy {
  
  viewDate: Date = new Date();

  ngOnInit(): void {

  }

  // Calendar
  monthSelected= true;
  weekSelected!: Boolean;
  daySelected!: Boolean;

  onMonthSelected() { this.weekSelected = false; this.monthSelected = true; }
  onWeekSelected() { this.monthSelected = false; this.weekSelected = true; }
  onDaySelected() { this.daySelected = true; }

  events: CalendarEvent[] = [
  {
    start: new Date(2023, 5, 18, 10, 0, 0),
    title: 'Event 1',
  },
  {
    start: new Date(2023, 5, 20, 14, 30, 0),
    title: 'Event 2',
  },
  ];

  ngOnDestroy(): void {}

}
