import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observation } from 'src/app/models/observation';
import { Student } from 'src/app/models/student';
import { ObservationService } from 'src/app/services/observation.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-observationlist',
  templateUrl: './observationlist.component.html',
  styleUrls: ['./observationlist.component.css']
})
export class ObservationlistComponent implements OnInit, OnDestroy {
  param$!: Subscription;
  studentId!: string;
  student!: Student;
  observations!: Observation[];

  constructor(private activatedRoute: ActivatedRoute, private observationSvc: ObservationService,
              private studentSvc: StudentService, private router: Router) { }

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
    this.observationSvc.getAllObservations(this.studentId)
      .then((response) => {
          const observations = response;
          this.observations = [];
          for (const ob of observations) {
            const o = new Observation (ob.observationId, ob.date, ob.notes, ob.studentId);
            this.observations.push(o);
          }
        })
      .catch((error) => {
          console.error("Error fetching observations:", error);
          this.observations = [];
      });
  };

  confirmDelete(observationId: string): void {
    const confirmation = window.confirm("Are you sure you want to permanently delete this observation?");
    if (confirmation) {
      this.observationSvc.deleteObservation(observationId)
        .then(()=> {
          this.observationSvc.getAllObservations(this.studentId)
            .then((response) => {
              this.observations = response;
            })
            .catch((error) => {
              console.log('Error while retrieving Observations', error);
              this.observations = [];
            })
        });
    } else {
      return;
    }
  }

  addObservation() {
    this.router.navigate(['/add-observation', this.studentId]);
  }

  ngOnDestroy(): void { this.param$.unsubscribe(); }

}
