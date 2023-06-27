import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Grade } from 'src/app/models/grade';
import { Student } from 'src/app/models/student';
import { GradeService } from 'src/app/services/grade.service';
import { StudentService } from 'src/app/services/student.service';
import { Chart, ChartConfiguration } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(ChartDataLabels);

@Component({
  selector: 'app-analysegrade',
  templateUrl: './analysegrade.component.html',
  styleUrls: ['./analysegrade.component.css']
})
export class AnalysegradeComponent implements OnInit, OnDestroy {
  param$!: Subscription;
  studentId!: string;
  student!: Student;
  grades!: Grade[];
  selectedGrades: Grade[] = [];
  selectAllGrades: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private studentSvc: StudentService,
    private gradeSvc: GradeService) { }

  ngOnInit(): void {
    this.param$ = this.activatedRoute.params.subscribe(
      (params) => {
        this.studentId = params['studentId'];

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
      this.gradeSvc.getAllGrades(this.studentId)
        .then(
          (response) => {
            const grades = response;
            this.grades = [];

            for (const grade of grades) {
              const g = new Grade(
                grade.gradeId, grade.subject, grade.date, grade.assessment,
                grade.score, grade.baseScore, grade.percentageScore, grade.format, grade.studentId,
              );
              this.grades.push(g);
            }
            if (this.grades.length === 0) {
              console.log('No grades found for student.');
            }
          },
          error => {
            console.log('Error while retrieving Grades', error);
            this.grades = [];
          }
        )
      }
    )
  }

  confirmDelete(gradeId: string): void {
    const confirmation = window.confirm("Are you sure you want to permanently delete this grade?");
    if (confirmation) {
      this.gradeSvc.deleteGrade(gradeId)
        .then(() => {
          this.gradeSvc.getAllGrades(this.studentId)
            .then((response) => {
              this.grades = response;
            })
            .catch((error) => {
              console.log('Error while retrieving Grades', error);
              this.grades = [];
            })
        });
    } else {
      return;
    }
  }

  /*** Grade Analysis ***/

  onSelectGrade(grade: Grade) {
    const index = this.selectedGrades.indexOf(grade);
    // If grade exists, remove it from the array, else push
    if (index >= 0) {
      this.selectedGrades.splice(index, 1);
    } else {
      this.selectedGrades.push(grade);
    }
    this.selectAllGrades = this.selectedGrades.length === this.grades.length;
  }

  selectAll(): void {
    if (this.selectAllGrades) {
      this.selectedGrades = [...this.grades];
    } else {
      this.selectedGrades = [];
    }
  }

  isChartReady: Boolean = false;
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartConfiguration<'bar' | 'line'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: '' }]
  };
  public barChartOptions: ChartConfiguration<'bar' | 'line'>['options'] = {
    responsive: false,
    scales: {
      x: {
        ticks: {
          font: {
            size: 16
          },
        }
      },
      y: {
        ticks: {
          font: {
            size: 16
          }
        },
        // title: {
        //   display: true,
        //   text: '%',
        //   font: {
        //     size: 18
        //   }
        // }
      }
    },
    layout: {
      padding: {
        top: 30
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 16
          }
        }
      }
    }
  };

  toAnalyse(data: Grade[]) {
    this.barChartData = {
      labels: data.map(grade => [grade.subject, grade.assessment, grade.date]),
      datasets: [
        {
          type: 'bar',
          data: data.map(grade => grade.percentageScore),
          label: 'Percentage Score',
          barPercentage: 0.6,
          categoryPercentage: 1,
          datalabels: {
            color: 'black',
            display: true,
            align: 'end',
            anchor: 'end',
            font: {
              size: 16
            },
            formatter: (value: number) => {
              return value.toString() + "%";
            }
          }
        },
        {
          type: 'line',
          data: data.map(grade => grade.percentageScore),
          label: 'Trendline',
          fill: false,
          datalabels: {
            display: false,
          }
        }
      ]
    };
    this.isChartReady = true;
  }

  /*** Report Generation ***/

  @ViewChild(BaseChartDirective, { static: false }) chart?: BaseChartDirective;

  toGenerateReport(): void {
    sessionStorage.setItem('selectedGrades', JSON.stringify(this.selectedGrades));

    const chartImage = this.chart?.toBase64Image();
    if (chartImage) {
      sessionStorage.setItem('chartImage', chartImage);
    }
  }

  ngOnDestroy(): void { this.param$.unsubscribe(); }

}
