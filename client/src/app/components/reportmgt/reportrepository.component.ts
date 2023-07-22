import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Report } from 'src/app/models/report';
import { ReportService } from 'src/app/services/report.service';
import { TutorService } from 'src/app/services/tutor.service';

@Component({
  selector: 'app-reportrepository',
  templateUrl: './reportrepository.component.html',
  styleUrls: ['./reportrepository.component.css']
})
export class ReportrepositoryComponent implements OnInit {
  tutorId!: number;
  reports!: Report[];

  constructor(private tutorSvc: TutorService, private reportSvc: ReportService) { }

  ngOnInit(): void { 
    this.tutorId = this.tutorSvc.getTutorId();
    this.reportSvc.getAllReportsByTutor(this.tutorId)
      .then((response) => {
          const reports = response;
          this.reports = [];
          for (const rp of reports) {
            const r = new Report (rp.reportId, rp.date, rp.reportUrl, rp.studentId, rp.studentFirstName, rp.studentLastName);
            this.reports.push(r);
          }
        })
      .catch((error) => {
          console.error("Error fetching reports:", error);
          this.reports = [];
      });
  }

  openReport(reportId: string): void {
    this.reportSvc.getReport(reportId).then(blob => {
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    }).catch(error => {
      console.error('Error fetching report:', error);
    });
  }

  confirmDelete(reportId: string): void {
    const confirmation = window.confirm("Are you sure you want to permanently delete this report?");
    if (confirmation) {
      this.reportSvc.deleteReport(reportId)
        .then(()=> {
          this.reportSvc.getAllReportsByTutor(this.tutorId)
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

}
