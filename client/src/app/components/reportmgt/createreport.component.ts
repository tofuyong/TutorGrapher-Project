import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, reduce } from 'rxjs';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { jsPDF } from "jspdf";
import { ReportService } from 'src/app/services/report.service';
import { Grade } from 'src/app/models/grade';
import autoTable from 'jspdf-autotable';
import { TutorService } from 'src/app/services/tutor.service';
import { Tutor } from 'src/app/models/tutor';


@Component({
  selector: 'app-createreport',
  templateUrl: './createreport.component.html',
  styleUrls: ['./createreport.component.css']
})
export class CreatereportComponent implements OnInit, OnDestroy {
  param$!: Subscription;
  tutorId!: number;
  tutorReportName!: string;
  studentId!: string;
  savedStudent!: Student;
  reportCardForm!: FormGroup;
  chartImageSrc!: string;
  isSaveReport = false;
  studentIdentifier = "";
  selectedGrades: Grade[] = [];

  constructor(private activatedRoute: ActivatedRoute, private studentSvc: StudentService,
    private fb: FormBuilder, private router: Router, private reportSvc: ReportService,
    private tutorSvc: TutorService) { }

  ngOnInit(): void {
    this.tutorId = this.tutorSvc.getTutorId();
    this.tutorSvc.getTutor(this.tutorId)
      .then((response: Tutor) => {
          const salutation = response.salutation;
          const firstName = response.firstName;
          const lastName = response.lastName;
          this.tutorReportName = salutation + " " + firstName + " " + lastName;

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
                this.reportCardForm = this.createForm();
              },
              error => {
                console.log('Error while retrieving Student', error);
              }
            );
      })
      .catch((error) => {
          console.error("Error fetching tutor:", error);
      }
    );
    
    this.selectedGrades = JSON.parse(sessionStorage.getItem('selectedGrades') || '[]');
    const chartImage = sessionStorage.getItem('chartImage');
    if (chartImage) {
      this.chartImageSrc = chartImage;
    }
  }

  createForm() {
    return this.fb.group({
      firstName: this.fb.control(this.savedStudent.firstName),
      lastName: this.fb.control(this.savedStudent.lastName),
      school: this.fb.control(this.savedStudent.school),
      level: this.fb.control(this.savedStudent.level),
      year: this.fb.control(this.savedStudent.year),
      band: this.fb.control(this.savedStudent.band),
      title: this.fb.control('', Validators.required),
      date: this.fb.control('', Validators.required),
      conductFeedback: this.fb.control('Student has done well this semester and has shown much improvement in grades. He has consistently demonstrated a strong work ethic and a genuine enthusiasm for learning. It is evident that he has overcome previous academic challenges.', Validators.required),
      academicFeedback: this.fb.control('Student is attentive and participative in class. He is punctual and prepared, often taking down notes during the lessons. With this positive attitude, he will excel in the year end examinations.', Validators.required),
      preparedBy: this.fb.control(this.tutorReportName)
    });
  }

  submitReportCardForm() {
    this.router.navigate(['/loading']);
    const doc = new jsPDF();

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text("PROGRESS REPORT CARD", 60, 15);

    doc.setFontSize(12);
    doc.setFont('times', 'bold');
    const report = this.reportCardForm.value;
    let titleTrimmed = report.title.trim()
    let titleWidth = doc.getStringUnitWidth(titleTrimmed) * 12 / doc.internal.scaleFactor;
    let titleX = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
    doc.text(titleTrimmed, titleX, 23);

    doc.setFont('times', 'normal');
    let date = new Date(report.date);
    let formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    doc.text("Date: " + formattedDate, 20, 35)
    doc.text("Student: " + report.firstName + " " + report.lastName, 20, 43);
    doc.text("School: " + report.school, 20, 51);
    doc.text("Level / Stream: " + report.level + " " + report.year + " " + report.band, 20, 59);

    // Table
    autoTable(doc, { html: '#grades-table', startY: 70 } );
    
    let finalY = (doc as any).lastAutoTable.finalY;

    // Chart
    let imageData = sessionStorage.getItem('chartImage');
    if (imageData) {
      doc.addImage(imageData, 'PNG', 20, finalY + 5, 165, 85);
    }

    doc.text("Academic Feedback: " + report.academicFeedback, 20, finalY + 100, { maxWidth: 160, align: "justify" });
    doc.text("Conduct Feedback: " + report.conductFeedback, 20, finalY + 125, { maxWidth: 160, align: "justify" });
    doc.text("Prepared by: " + report.preparedBy, 20, finalY + 150);

    this.studentIdentifier = this.savedStudent.firstName + this.savedStudent.lastName + this.savedStudent.studentId;

    if (this.isSaveReport) {
      const pdfBlob = doc.output('blob');
      this.reportSvc.saveReport(this.studentId, pdfBlob, this.studentIdentifier)
        .then(
          response => {
            console.log('Report saved successfully', response);
            this.router.navigate(['saved-reports', this.studentId]);
          },
          error => {
            console.log('Failed to save report', error);
          }
        );
    } else {
      doc.save(report.firstName + report.lastName + report.date + ".pdf");
      this.router.navigate(['saved-reports', this.studentId]);
    }
  }

  save() {
    this.isSaveReport = true;
  }

  ngOnDestroy(): void { this.param$.unsubscribe(); }

}
