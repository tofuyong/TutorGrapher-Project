import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TutorService } from './services/tutor.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { clearStudents } from './store/student.action';
import { selectTutor } from './store/tutor.selector';
import { fetchTutor } from './store/tutor.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Client';
  isLoggedIn: boolean = false;
  private loginStatus$!: Subscription;
  tutorId!: number;
  tutorFirstName!: string;
  tutorLastName!: string;
  tutorSalutation!: string;
  tutorPhoto!: string;
  private tutorSubscription?: Subscription

  constructor(private tutorSvc: TutorService, private router: Router, private store:Store) { 
  }

  ngOnInit(): void {
    this.loginStatus$ = this.tutorSvc.getLoginStatus().subscribe(status => {
      this.isLoggedIn = status;
      if (status) {
        this.tutorId = this.tutorSvc.getTutorId();
        this.store.dispatch(fetchTutor({ tutorId: this.tutorId }));
        this.tutorSubscription = this.store.select(selectTutor).subscribe(tutor => {
          if (tutor) {
            this.tutorFirstName = tutor.firstName;
            this.tutorLastName = tutor.lastName;
            this.tutorSalutation = tutor.salutation;
            this.tutorPhoto = tutor.photo;
          }
        });
      } 
    });
  }

  toTutorProfile() {
    this.router.navigate(['/tutor', this.tutorId]);
  }

  logout(){
    this.tutorSvc.logout();
    this.isLoggedIn = false;
    this.store.dispatch(clearStudents());
    this.router.navigate(['']);
  }

  ngOnDestroy(): void { 
    this.loginStatus$.unsubscribe();
    this.tutorSubscription?.unsubscribe();
  }
  
}