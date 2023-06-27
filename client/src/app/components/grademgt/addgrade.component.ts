import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/models/student';
import { GradeService } from 'src/app/services/grade.service';
import { StudentService } from 'src/app/services/student.service';
import { DateValidator } from 'src/app/validators/date-validator';
import { GradeValidator } from 'src/app/validators/grade-validator';

@Component({
  selector: 'app-addgrade',
  templateUrl: './addgrade.component.html',
  styleUrls: ['./addgrade.component.css']
})
export class AddgradeComponent implements OnInit, OnDestroy {
  param$!: Subscription;
  studentId!: string;
  student!: Student;
  gradeForm!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private studentSvc: StudentService, private gradeSvc: GradeService) { }

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
    this.gradeForm = this.createForm();
  }

  createForm() {
    return this.fb.group({
      subject: this.fb.control('', Validators.required),
      date: this.fb.control('', [Validators.required, DateValidator.BeforeTwoZero] ),
      assessment: this.fb.control('', Validators.required ),
      score: this.fb.control('', [Validators.required, GradeValidator.WholeOrHalfPoint] ),
      baseScore: this.fb.control('', [Validators.required, GradeValidator.WholeOrHalfPoint]),
      format: this.fb.control(''),
      studentId: this.fb.control(this.studentId) 
    }); 
  }

  submitGradeForm() {
    const score = this.gradeForm.get('score')?.value;
    const baseScore = this.gradeForm.get('baseScore')?.value;
    if (score > baseScore) {
      alert('Score cannot be higher than the Base Score.');
      return; 
    }

    if (this.gradeForm.valid && score <= baseScore) {
      const grade = this.gradeForm.value;
        this.gradeSvc.addGrade(grade)
        .then(
          response => {
            console.log('Successfully added grade to student: ', response);
            this.router.navigate(['/analyse-grades', this.studentId]); 
          },
          error => {
            console.log('Error while sending to server', error);
            alert('Failed to add grade to student');
          }
        );
    };
  }

  hasError(input: string): boolean {
    return !!(this.gradeForm.get(input)?.invalid && this.gradeForm.get(input)?.dirty)
  }

  ngOnDestroy(): void { this.param$.unsubscribe(); }
  
}
