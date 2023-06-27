import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { TutorService } from 'src/app/services/tutor.service';

@Component({
  selector: 'app-selectstudent',
  templateUrl: './selectstudent.component.html',
  styleUrls: ['./selectstudent.component.css']
})
export class SelectstudentComponent implements OnInit, OnDestroy {
  previousUrl!: string;
  tutorId!: number;
  selectStudentForm!: FormGroup;
  student!: Student;
  selectedStudentId!: string;
  currentStudents!: Student[];
  pastStudents!: Student[];
  studentsToDisplay: Student[] = [];

  constructor(private fb: FormBuilder, private studentSvc: StudentService,
              private tutorSvc: TutorService, private router: Router) { }

  ngOnInit(): void {
    this.tutorId = this.tutorSvc.getTutorId();
    this.selectStudentForm = this.createForm();
    this.selectStudentForm.get('isActive')?.valueChanges.subscribe(isActive => {
      this.updateStudentList(isActive);
    });
    this.studentSvc.getAllStudents(this.tutorId)
    .then(
      (response) => {
        const students = response;
        this.currentStudents = [];
        this.pastStudents = [];

        for (const student of students) {
          const s = new Student(
            student.studentId, student.isActive, student.firstName, student.lastName,
            student.gender, new Date(student.dob), student.phone, student.email,
            student.school, student.level, student.year, student.band,
            student.cca, student.interests, student.tutorId
          );

          if (s.isActive) {
            this.currentStudents.push(s);
          } else {
            this.pastStudents.push(s);
          }
        }
        this.updateStudentList(this.selectStudentForm.get('isActive')?.value as string);
      },
      error => {
        console.log('No students in record', error);
      }
    )   
  }

  createForm() {
    return this.fb.group({
      isActive: this.fb.control('true'),
      studentId: this.fb.control('', Validators.required),
      component: this.fb.control('', Validators.required)
    })
  }

  updateStudentList(isActive:string) {
    this.studentsToDisplay = (isActive === 'true') ? this.currentStudents : this.pastStudents;
  }

  submit() {
    const selectedStudentId = this.selectStudentForm.get('studentId')?.value;
    const selectedComponent = this.selectStudentForm.get('component')?.value;
    let route: string = '/student';
    if (selectedComponent === 'grade') {
      route = '/analyse-grades';
    } else if (selectedComponent === 'observation') {
      route = '/observation-list';
    } else if (selectedComponent === 'detail') {
      route = '/student';
    } else if (selectedComponent === 'report') {
      route = '/saved-reports';
    }
    this.router.navigate([route, selectedStudentId]);
  }

  ngOnDestroy(): void { }
  
}
