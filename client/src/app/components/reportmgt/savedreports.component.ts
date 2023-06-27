import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Report } from 'src/app/models/report';
import { Student } from 'src/app/models/student';
import { ReportService } from 'src/app/services/report.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-savedreports',
  templateUrl: './savedreports.component.html',
  styleUrls: ['./savedreports.component.css']
})
export class SavedreportsComponent implements OnInit, OnDestroy {
  param$!: Subscription;
  studentId!: string;
  student!: Student;
  reports!: Report[];
  loading: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private reportSvc: ReportService,
              private studentSvc: StudentService) { }

  ngOnInit(): void {
    this.loading = true;
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
    this.reportSvc.getAllReports(this.studentId)
      .then((response) => {
          const reports = response;
          this.reports = [];
          for (const rp of reports) {
            const r = new Report (rp.reportId, rp.date, rp.reportUrl, rp.studentId, rp.studentFirstName, rp.studentLastName);
            this.reports.push(r);
          }
          this.loading = false;
        })
      .catch((error) => {
          console.error("Error fetching reports:", error);
          this.reports = [];
          this.loading = false;
      });
  };

  confirmDelete(reportId: string): void {
    const confirmation = window.confirm("Are you sure you want to permanently delete this report?");
    if (confirmation) {
      this.reportSvc.deleteReport(reportId)
        .then(()=> {
          this.reportSvc.getAllReports(this.studentId)
            .then((response) => {
              this.reports = response;
            })
            .catch((error) => {
              console.log('Error while retrieving Reports', error);
              this.reports = [];
            })
        });
    } else {
      return;
    }
  }

  ngOnDestroy(): void { this.param$.unsubscribe(); }

}
