import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LEVEL_STREAM, LEVEL_YEAR } from 'src/app/constants/student-form-fields';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { DateValidator } from 'src/app/validators/date-validator';
import { PhoneValidator } from 'src/app/validators/phone-validator';

@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrls: ['./editstudent.component.css']
})
export class EditstudentComponent implements OnInit, OnDestroy {
  editStudentForm!: FormGroup;
  years: number[] = [1, 2, 3, 4, 5, 6];
  param$!: Subscription;
  studentId!: string;
  savedStudent!: Student;
  selectedLevel!: string;
  streamOptions: string[] = [];
  yearOptions: string[] = [];

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, 
              private router: Router, private studentSvc: StudentService) { }

  ngOnInit(): void {
    this.param$ = this.activatedRoute.params.subscribe(
      (params) => {
        this.studentId = params['studentId'];
      }
    );
    this.studentSvc.getStudent(this.studentId)
      .then(
        (response: Student) => {
          this.savedStudent = response;
          console.log('Student retrieved successfully.');
          this.streamOptions = LEVEL_STREAM[this.savedStudent.level];
          this.yearOptions = LEVEL_YEAR[this.savedStudent.level];
          this.editStudentForm = this.createForm();
        },
      error => {
        console.log('Error while retrieving Student', error);
      }
    );
  }

  createForm() {
    return this.fb.group({
      firstName: this.fb.control(this.savedStudent.firstName, Validators.required),
      lastName: this.fb.control(this.savedStudent.lastName, Validators.required),
      isActive: this.fb.control(this.savedStudent.isActive.toString(), Validators.required),
      gender: this.fb.control(this.savedStudent.gender, Validators.required),
      dob: this.fb.control(this.savedStudent.dob, [Validators.required, DateValidator.LaterThanToday]),
      phone: this.fb.control(this.savedStudent.phone, [Validators.required, Validators.minLength(8), Validators.maxLength(8), PhoneValidator.NumbersOnly]),
      email: this.fb.control(this.savedStudent.email),
      school: this.fb.control(this.savedStudent.school, Validators.required),
      level: this.fb.control(this.savedStudent.level, Validators.required),
      year: this.fb.control(this.savedStudent.year.toString(), Validators.required),
      band: this.fb.control(this.savedStudent.band, Validators.required),
      cca: this.fb.control(this.savedStudent.cca),
      interests: this.fb.control(this.savedStudent.interests)
    }); 
  }

  hasError(input: string): boolean {
    return !!(this.editStudentForm.get(input)?.invalid && this.editStudentForm.get(input)?.dirty)
  }

  submitEditStudentForm() {
    if (this.editStudentForm.valid) {
      const student = this.editStudentForm.value;

        this.studentSvc.updateStudent(student, this.studentId)
        .then(
          response => {
            console.log('Successfully updated student: ', response);
            this.router.navigate(['/student', this.studentId]);
          },
          error => {
            console.log('Error while updating student', error);
            alert('Failed to update student');
          }
        );
    };
  }

  onLevelSelection(event: any) {
    this.selectedLevel = event.value;
    this.streamOptions = LEVEL_STREAM[this.selectedLevel];
    this.yearOptions = LEVEL_YEAR[this.selectedLevel];

    this.editStudentForm.get('year')?.setValue('');
    this.editStudentForm.get('band')?.setValue('');
  }

  ngOnDestroy(): void { this.param$.unsubscribe(); }

}
