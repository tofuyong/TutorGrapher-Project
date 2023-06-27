import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/student';
import { QUOTES } from 'src/app/constants/quotes';
import { ObservationService } from 'src/app/services/observation.service';
import { ReportService } from 'src/app/services/report.service';
import { StudentService } from 'src/app/services/student.service';
import { TutorService } from 'src/app/services/tutor.service';
import { fetchStudents } from 'src/app/store/student.action';
import { selectStudents } from 'src/app/store/student.selector';
import { changeTab } from 'src/app/store/tab.action';
import { CalendarService } from 'src/app/services/calendar.service';
import { Router } from '@angular/router';

const colors: any = {
  purple: {
    primary: '#D1A0F2',
    secondary: '#D1A0F2'
  },
  yellow: {
    primary: '#FFF44F',
    secondary: '#FFE570'
  },
  orange: {
    primary: '#FFA500',
    secondary: '#FFB870',
  },
  amber: {
    primary: '#ff5349',
    secondary: '#ff5349',
  },
  green: {
    primary: '#A0C49D',
    secondary: '#C1ECE4',
  }
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  noOfCurrent!: number;
  noOfPast!: number;
  noOfObs!: number;
  tutorId!: number;
  currentStudents!: Student[];
  reportCount!: number;
  currentDate: string = '';
  currentDay: string = '';
  selectedQuote: string = '';
  quoteText: string = '';
  quoteAuthor: string = '';
  allBirthdaysLoaded = false;
  allHolidaysLoaded = false;
  allEventsLoaded = false;
  calendarLoading = true;
  
  constructor(private studentSvc: StudentService, private tutorSvc: TutorService,
              private observationSvc: ObservationService, private reportSvc: ReportService,
              private calendarSvc: CalendarService, private store: Store,
              private router: Router){ }
  
  ngOnInit(): void {
    this.events = [];
    this.getDateTime();
    this.getQuote();
    this.tutorId = this.tutorSvc.getTutorId();
    if (this.tutorId) {
      this.studentSvc.countCurrentStudent(this.tutorId)
        .then(response => this.noOfCurrent = response);
      this.studentSvc.countExStudent(this.tutorId)
        .then(response => this.noOfPast = response);
      this.observationSvc.getObservationCountByTutor(this.tutorId)
        .then(response => this.noOfObs = response);
      this.reportSvc.getReportCountByTutor(this.tutorId)
        .then(response => this.reportCount = response);

      this.store.dispatch(fetchStudents({ tutorId: this.tutorId }));
      this.store.select(selectStudents).subscribe(students => {
        this.currentStudents = students.filter(s => s.isActive);
        this.getStudentBirthdays();
        this.getHolidays();
      });
    }
  }

  onTabChange(tabIndex: number) {
    this.store.dispatch(changeTab({ tabIndex }));
  }

  getDateTime() {
    const now = new Date();
    this.currentDay = now.toLocaleString('default', { weekday: 'long' });
    this.currentDate = now.toLocaleString('default', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  getQuote() {
    let quoteIndex = Math.floor(Math.random() * QUOTES.length);
    this.selectedQuote = QUOTES[quoteIndex];
    let quoteParts = this.selectedQuote.split(" - ");
    this.quoteText = quoteParts[0];
    this.quoteAuthor = quoteParts[1];
  }

  // Calendar
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  view: CalendarView = CalendarView.Month;

  previousMonth() {
    const previousMonth = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
    this.viewDate = previousMonth;
  }
  
  nextMonth() {
    const nextMonth = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
    this.viewDate = nextMonth;
  }

  getStudentBirthdays() {
    if (this.allBirthdaysLoaded) {
      return;
    }
    
    this.currentStudents.forEach(student => {
      let dob = new Date(student.dob);
      let currentYearBirthday = new Date(new Date().getFullYear(), dob.getMonth(), dob.getDate());
      let nextYearBirthday = new Date(new Date().getFullYear() + 1, dob.getMonth(), dob.getDate());

      this.events.push({
        start: currentYearBirthday,
        title: student.firstName + " " + student.lastName + "'s Birthday",
        allDay: true,
        color: colors.amber,
        id: student.studentId,
      }, 
      {
        start: nextYearBirthday,
        title: student.firstName + " " + student.lastName + "'s Birthday",
        allDay: true,
        color: colors.amber,
        id: student.studentId,
      });
      this.allBirthdaysLoaded = true; // repositioned
    })
    this.checkAllEventsLoaded();
  }

  getHolidays() {
    if (this.allHolidaysLoaded) {
      return;
    };
    this.allHolidaysLoaded = true;
    this.calendarSvc.getAllHolidays()
    .then(
      (response: any[]) => { 
        response.forEach(holiday => {
          let start = new Date(holiday.start);
          let end = new Date(holiday.end);
          let color = colors.grey;

          switch(holiday.type) {
            case 'PH':
              color = colors.orange;
              break;
            case 'SH':
              color = colors.yellow;
              break;
            case 'TH':
              color = colors.green;
              break;
          }

          this.events.push({
            start: start,
            end: end,
            title: holiday.title,
            allDay: holiday.allDay,
            color: color
          });
        });
        this.checkAllEventsLoaded();
      }
    );
  }

  checkAllEventsLoaded() {
    if (this.allBirthdaysLoaded && this.allHolidaysLoaded) {
      setTimeout(() => {
        this.calendarLoading = false;
      }, 600);
      this.allEventsLoaded = true;
    }
  }

  handleEvent(event: CalendarEvent) {
    if (event.id) {
      this.router.navigate(['/student', event.id]);
    }
  }

  ngOnDestroy(): void {
    this.events = [];
  }
  
}
