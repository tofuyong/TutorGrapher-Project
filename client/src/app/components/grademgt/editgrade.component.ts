import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Grade } from 'src/app/models/grade';
import { GradeService } from 'src/app/services/grade.service';
import { DateValidator } from 'src/app/validators/date-validator';
import { GradeValidator } from 'src/app/validators/grade-validator';

@Component({
  selector: 'app-editgrade',
  templateUrl: './editgrade.component.html',
  styleUrls: ['./editgrade.component.css']
})
export class EditgradeComponent implements OnInit, OnDestroy {
  editGradeForm!: FormGroup;
  param$!: Subscription;
  studentId!: string;
  gradeId!: string;
  savedGrade!: Grade;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, 
              private fb: FormBuilder, private gradeSvc: GradeService) { }
  
  ngOnInit(): void {
    this.param$ = this.activatedRoute.params.subscribe(
      (params) => {
        this.studentId = params['studentId'];
        this.gradeId = params['gradeId'];
      }
    )
    this.gradeSvc.getGrade(this.gradeId)
      .then(
        (response: Grade) => {
          this.savedGrade = response;
          console.log('Grade retrieved successfully.');
          this.editGradeForm = this.createForm();
        },
      error => {
        console.log('Error while retrieving Grade', error);
      }
    );
  }

  createForm() {
    return this.fb.group({
      subject: this.fb.control(this.savedGrade.subject, Validators.required),
      date: this.fb.control(this.savedGrade.date, [Validators.required, DateValidator.BeforeTwoZero]),
      assessment: this.fb.control(this.savedGrade.assessment, Validators.required),
      score: this.fb.control(this.savedGrade.score, [Validators.required, GradeValidator.WholeOrHalfPoint]),
      baseScore: this.fb.control(this.savedGrade.baseScore, [Validators.required, GradeValidator.WholeOrHalfPoint]),
      format: this.fb.control(this.savedGrade.format)
    }); 
  }

  hasError(input: string): boolean {
    return !!(this.editGradeForm.get(input)?.invalid && this.editGradeForm.get(input)?.dirty)
  }

  submitEditGradeForm() {
    const score = this.editGradeForm.get('score')?.value;
    const baseScore = this.editGradeForm.get('baseScore')?.value;
    if (score > baseScore) {
      alert('Score cannot be higher than the Base Score.');
      return; 
    }

    if (this.editGradeForm.valid && score <= baseScore) {
      const grade = this.editGradeForm.value;

        this.gradeSvc.updateGrade(grade, this.gradeId)
        .then(
          response => {
            console.log('Successfully updated grade: ', response);
            this.router.navigate(['/analyse-grades', this.studentId]);
          },
          error => {
            console.log('Error while updating grade', error);
            alert('Failed to update grade');
          }
        );
    };
  }

  ngOnDestroy(): void { this.param$.unsubscribe(); }
  
}
