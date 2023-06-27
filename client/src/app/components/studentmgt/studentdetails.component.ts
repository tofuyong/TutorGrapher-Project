import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Grade } from 'src/app/models/grade';
import { Lesson } from 'src/app/models/lesson';
import { Student } from 'src/app/models/student';
import { LessonService } from 'src/app/services/lesson.service';
import { StudentService } from 'src/app/services/student.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-studentdetails',
  templateUrl: './studentdetails.component.html',
  styleUrls: ['./studentdetails.component.css']
})
export class StudentdetailsComponent implements OnInit, OnDestroy {
  param$!: Subscription;
  studentId!: string;
  student!: Student;
  grades!: Grade[];
  selectedGrade!: Grade;
  selectedGradeId!: string;
  lesson!: Lesson;
  googleMapsUrl!: SafeResourceUrl;
  blankImageUrl: string = "/assets/images/about.png";
  
  constructor(private activatedRoute: ActivatedRoute, private studentSvc: StudentService,
      private lessonSvc: LessonService, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.param$ = this.activatedRoute.params.subscribe(
      (params) => {
        this.studentId = params['studentId'];
      }
    );
    this.studentSvc.getStudent(this.studentId)
      .then(
        (response: Student) => {
          this.student = response;
          console.log('Student retrieved successfully.');
      },
      error => {
        console.log('Error while retrieving Student', error);
      }
    );
    this.lessonSvc.getLesson(this.studentId)
      .then(
        (response: Lesson) => {
          if (response != null) {
            this.lesson = response;
            let address = this.lesson.address.replace(' ', '+') + ',+' + this.lesson.postalCode;
            this.googleMapsUrl = this.sanitizer.bypassSecurityTrustResourceUrl
            (`https://www.google.com/maps/embed/v1/place?key=${environment.googleMapsApiKey}&q=${address}&zoom=15`);
            console.log('Lesson details retrieved successfully.');
          }
      },
      error => {
        console.log('No lesson details in record', error);
      }
    );
  }

  ngOnDestroy(): void { this.param$.unsubscribe(); }
  
}

