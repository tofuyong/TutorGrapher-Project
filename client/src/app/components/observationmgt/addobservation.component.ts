import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/models/student';
import { ObservationService } from 'src/app/services/observation.service';
import { StudentService } from 'src/app/services/student.service';
import { DateValidator } from 'src/app/validators/date-validator';

@Component({
  selector: 'app-addobservation',
  templateUrl: './addobservation.component.html',
  styleUrls: ['./addobservation.component.css']
})
export class AddobservationComponent implements OnInit, OnDestroy{
  param$!: Subscription;
  studentId!: string;
  student!: Student;
  observationForm!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private studentSvc: StudentService, private observationSvc: ObservationService) { }
  
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
    this.observationForm = this.createForm();
  }

  createForm() {
    return this.fb.group({
      date: this.fb.control('', [Validators.required, DateValidator.BeforeTwoZero]),
      notes: this.fb.control('', Validators.required),
      studentId: this.fb.control(this.studentId) 
    }); 
  }

  hasError(input: string): boolean {
    return !!(this.observationForm.get(input)?.invalid && this.observationForm.get(input)?.dirty)
  }

  submitObservationForm() {
    const observation = this.observationForm.value;
    this.observationSvc.addObservation(observation)
      .then(
        response => {
          console.log('Successfully added observation to student: ', response);
          this.router.navigate(['/observation-list', this.studentId]); 
        },
        error => {
          console.log('Error while sending to server', error);
          alert('Failed to add observation to student');
        }
      );
  };

  ngOnDestroy(): void { this.param$.unsubscribe(); }

}
