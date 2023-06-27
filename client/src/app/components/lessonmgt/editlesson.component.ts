import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lesson } from 'src/app/models/lesson';
import { LessonService } from 'src/app/services/lesson.service';
import { PostalCodeValidator } from 'src/app/validators/postalcode-validator';

@Component({
  selector: 'app-editlesson',
  templateUrl: './editlesson.component.html',
  styleUrls: ['./editlesson.component.css']
})
export class EditlessonComponent implements OnInit, OnDestroy{
  editLessonForm!: FormGroup;
  param$!: Subscription;
  studentId!: string;
  savedLesson!: Lesson;
  isNewLesson: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, 
    private fb: FormBuilder, private lessonSvc: LessonService) { }

    ngOnInit(): void {
      this.param$ = this.activatedRoute.params.subscribe(
        (params) => {
          this.studentId = params['studentId'];
        }
      );
      this.lessonSvc.getLesson(this.studentId)
        .then(
          (response: Lesson) => {
            if (response != null) {
              this.savedLesson = response;
              console.log('Lesson retrieved successfully.');
              this.isNewLesson = false;
            } else {
              console.log('No existing Lesson found, creating a new one.');
              this.savedLesson = this.getEmptyLesson();
              this.isNewLesson = true;
            }
            this.editLessonForm = this.createForm();
            this.editLessonForm.get('startTime')?.valueChanges.subscribe(() => this.updateDuration());
            this.editLessonForm.get('endTime')?.valueChanges.subscribe(() => this.updateDuration());
          },
          error => {
            console.log('Error while retrieving lesson details', error);
            this.savedLesson = this.getEmptyLesson();
            this.isNewLesson = true;
            this.editLessonForm = this.createForm();
            this.editLessonForm.get('startTime')?.valueChanges.subscribe(() => this.updateDuration());
            this.editLessonForm.get('endTime')?.valueChanges.subscribe(() => this.updateDuration());
          }
        );
    }
  
    getEmptyLesson(): Lesson {
        return {
          subject: '',
          dayOfWeek: '',
          startTime: '',
          endTime: '',
          duration: 0,
          hourlyRate: 0,
          address: '',
          postalCode: '',
          lessonId: '',
          studentId: this.studentId
        };
    }

  createForm() {
    return this.fb.group({
      subject: this.fb.control(this.savedLesson.subject, Validators.required),
      dayOfWeek: this.fb.control(this.savedLesson.dayOfWeek, Validators.required),
      startTime: this.fb.control(this.savedLesson.startTime, Validators.required),
      endTime: this.fb.control(this.savedLesson.endTime, Validators.required),
      duration: this.fb.control(this.savedLesson.duration, Validators.required),
      hourlyRate: this.fb.control(this.savedLesson.hourlyRate),
      address:this.fb.control(this.savedLesson.address),
      postalCode:this.fb.control(this.savedLesson.postalCode, [Validators.required, Validators.minLength(6), Validators.maxLength(6), PostalCodeValidator.NumbersOnly]),
      lessonId: this.fb.control(this.savedLesson.lessonId),
      studentId: this.fb.control(this.savedLesson.studentId)
    }); 
  }

  hasError(input: string): boolean {
    return !!(this.editLessonForm.get(input)?.invalid && this.editLessonForm.get(input)?.dirty)
  }

  submitEditLessonForm() {
    const startTime = this.editLessonForm.get('startTime')?.value;
    const endTime = this.editLessonForm.get('endTime')?.value;
      if (startTime >= endTime) {
        alert('End Time must be later than Start Time');
        return; 
      }

    if (this.editLessonForm.valid && endTime > startTime) {
      const lesson = this.editLessonForm.value;
        if (!this.isNewLesson) {
          this.lessonSvc.updateLesson(lesson, this.savedLesson.lessonId)
          .then(
            response => {
              console.log('Successfully updated lesson: ', response);
              this.router.navigate(['/student', this.studentId]);
            },
            error => {
              console.log('Error while updating lesson', error);
              alert('Failed to update lesson');
            }
          );
        } else {
          this.lessonSvc.addLesson(lesson)
          .then(
            response => {
              console.log('Successfully added lesson: ', response);
              this.router.navigate(['/student', this.studentId]);
            },
            error => {
              console.log('Error while adding lesson', error);
              alert('Failed to add lesson');
            }
          );
        }
    };
  }

  updateDuration(): void {
    const startTimeControl = this.editLessonForm.get('startTime');
    const endTimeControl = this.editLessonForm.get('endTime');
  
    if (startTimeControl && endTimeControl && startTimeControl.value && endTimeControl.value) {
      const startTime = new Date(`1970-01-01T${startTimeControl.value}:00`);
      const endTime = new Date(`1970-01-01T${endTimeControl.value}:00`);
      const diff = endTime.getTime() - startTime.getTime(); // difference in milliseconds
      const durationHours = Math.floor(diff / (1000 * 60 * 60)); // converting to hours
      const durationMinutes = Math.floor((diff / (1000 * 60)) % 60); // converting to minutes
      this.editLessonForm.get('duration')?.setValue(`${durationHours}h ${durationMinutes}m`, { emitEvent: false });
    }
  }

  ngOnDestroy(): void { this.param$.unsubscribe(); }

}
