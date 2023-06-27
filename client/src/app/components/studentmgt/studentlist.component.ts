import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LEVEL_STREAM, LEVEL_YEAR } from 'src/app/constants/student-form-fields';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { TutorService } from 'src/app/services/tutor.service';
import { addStudent, clearStudents, deleteStudent, fetchStudents } from 'src/app/store/student.action';
import { selectStudents } from 'src/app/store/student.selector';
import { selectTab } from 'src/app/store/tab.selector';
import { DateValidator } from 'src/app/validators/date-validator';
import { PhoneValidator } from 'src/app/validators/phone-validator';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentlistComponent implements OnInit, OnDestroy {
  tutorId!: number;
  currentStudents!: Student[];
  pastStudents!: Student[];
  studentForm!: FormGroup;
  currentStudents$!: Observable<Student[]>;
  pastStudents$!: Observable<Student[]>;
  successMsg: string = "";
  tabIndex$ = this.store.select(selectTab);
  selectedLevel!: string;
  streamOptions: string[] = [];
  yearOptions: string[] = [];
  
  constructor(private tutorSvc: TutorService, private fb: FormBuilder,  private store: Store) { }

  ngOnInit(): void {
    this.tutorId = this.tutorSvc.getTutorId();
    this.store.dispatch(fetchStudents({ tutorId: this.tutorId }));
    this.store.select(selectStudents).subscribe(students => {
      this.currentStudents = students.filter(s => s.isActive);
      this.pastStudents = students.filter(s => !s.isActive);
    });
    this.studentForm = this.createForm();
  }

  confirmDelete(studentId: number) {
    const confirmation = window.confirm("Are you sure you want to permanently delete this student? You may edit an ex-student's status instead of perform a delete.");
    if (confirmation) {
      this.store.dispatch(deleteStudent({ studentId: studentId }));
    } else {
      return;
    }
  }

  /*** Add Student Form ***/

  createForm() {
    return this.fb.group({
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required ),
      isActive: this.fb.control('', Validators.required ),
      gender: this.fb.control('', Validators.required ),
      dob: this.fb.control('', [Validators.required, DateValidator.LaterThanToday]),
      phone: this.fb.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(8), PhoneValidator.NumbersOnly]),
      email: this.fb.control(''),
      school: this.fb.control('', Validators.required ),
      level: this.fb.control('', Validators.required ),
      year: this.fb.control('', Validators.required ),
      band: this.fb.control('', Validators.required ),
      cca: this.fb.control(''),
      interests: this.fb.control(''),
      tutorId: this.fb.control(this.tutorId) 
    }); 
  }

  hasError(input: string): boolean {
    return !!(this.studentForm.get(input)?.invalid && this.studentForm.get(input)?.dirty)
  }

  submitStudentForm() {
    if (this.studentForm.valid) {
      const student = this.studentForm.value;
      this.store.dispatch(addStudent({ student: student }));
      this.successMsg = 'Successfully added student!';
    };
    this.studentForm.reset();
    Object.keys(this.studentForm.controls).forEach(key => {
      this.studentForm.get(key)?.setErrors(null);
    });
    this.studentForm.markAsPristine();
    this.studentForm.markAsUntouched();
    this.studentForm.get('tutorId')?.setValue(this.tutorId);
  }

  onLevelSelection(event: any){
    this.selectedLevel = event.value;
    this.streamOptions = LEVEL_STREAM[this.selectedLevel];
    this.studentForm.get('band')?.setValue(this.streamOptions[0]);
    this.yearOptions = LEVEL_YEAR[this.selectedLevel];
  }

  /*** Pagination ***/

  pageSize = 10; // Set default page size
  currentPage: number = 0;
  activeTabIndex = 0;

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  changeTab(index: number) {
    this.activeTabIndex = index;
    // Reset paginator to first page on tab change
    this.currentPage = 0; 
  }

  getActiveTabLength() {
    switch (this.activeTabIndex) {
      case 0: return this.currentStudents.length;
      case 1: return this.pastStudents.length;
      default: return 0;
    }
  }

  resetSuccessMsg() {
    this.successMsg = '';
  }

  ngOnDestroy(): void { }
  
}