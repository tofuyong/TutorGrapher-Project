import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observation } from 'src/app/models/observation';
import { ObservationService } from 'src/app/services/observation.service';
import { DateValidator } from 'src/app/validators/date-validator';

@Component({
  selector: 'app-editobservation',
  templateUrl: './editobservation.component.html',
  styleUrls: ['./editobservation.component.css']
})
export class EditobservationComponent implements OnInit, OnDestroy {
  editObservationForm!: FormGroup;
  param$!: Subscription;
  studentId!: string;
  observationId!: string;
  savedObservation!: Observation;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private fb: FormBuilder, private observationSvc: ObservationService) { }

  ngOnInit(): void {
    this.param$ = this.activatedRoute.params.subscribe(
      (params) => {
        this.studentId = params['studentId'];
        this.observationId = params['observationId'];
      }
    );
    this.observationSvc.getObservation(this.observationId)
      .then(
        (response: Observation) => {
          this.savedObservation = response;
          console.log('Observation retrieved successfully.');
          this.editObservationForm = this.createForm();
        },
        error => {
          console.log('Error while retrieving Observation', error);
        }
      )
  }

  createForm() {
    return this.fb.group({
      observationId: this.observationId,
      date: this.fb.control(this.savedObservation.date, [Validators.required, DateValidator.BeforeTwoZero]),
      notes: this.fb.control(this.savedObservation.notes, Validators.required)
    });
  }

  hasError(input: string): boolean {
    return !!(this.editObservationForm.get(input)?.invalid && this.editObservationForm.get(input)?.dirty)
  }

  submitEditObservationForm() {
    const observation = this.editObservationForm.value;
    this.observationSvc.updateObservation(observation, this.observationId)
      .then(
        response => {
          console.log('Successfully updated observation: ', response);
          this.router.navigate(['/observation-list', this.studentId]);
        },
        error => {
          console.log('Error while updating observation', error);
          alert('Failed to update observation');
        }
      );
  }

  ngOnDestroy(): void { this.param$.unsubscribe(); }

}
