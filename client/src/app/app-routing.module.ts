import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { StudentlistComponent } from './components/studentmgt/studentlist.component';
import { StudentdetailsComponent } from './components/studentmgt/studentdetails.component';
import { EditstudentComponent } from './components/studentmgt/editstudent.component';
import { AddgradeComponent } from './components/grademgt/addgrade.component';
import { AnalysegradeComponent } from './components/grademgt/analysegrade.component';
import { EditgradeComponent } from './components/grademgt/editgrade.component';
import { TutorprofileComponent } from './components/tutormgt/tutorprofile.component';
import { SelectstudentComponent } from './components/studentmgt/selectstudent.component';
import { EditlessonComponent } from './components/lessonmgt/editlesson.component';
import { CreatereportComponent } from './components/reportmgt/createreport.component';
import { ObservationlistComponent } from './components/observationmgt/observationlist.component';
import { AddobservationComponent } from './components/observationmgt/addobservation.component';
import { EditobservationComponent } from './components/observationmgt/editobservation.component';
import { SavedreportsComponent } from './components/reportmgt/savedreports.component';
import { AboutComponent } from './components/sidenav/about.component';
import { ContactComponent } from './components/sidenav/contact.component';
import { LoadingComponent } from './components/sidenav/loading.component';
import { ReportrepositoryComponent } from './components/reportmgt/reportrepository.component';
import { CalendarComponent } from './components/calendar/calendar.component';

const routes: Routes = [
  { path: '', title: 'Login', component: LoginComponent },
  { path: 'loading', title: 'Loading', component: LoadingComponent },
  { path: 'dashboard', title: 'Dashboard', component: DashboardComponent },
  { path: 'calendar', title: 'Calendar', component: CalendarComponent },
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: 'about', title: 'About', component: AboutComponent },
  { path: 'contact', title: 'Contact TutorGrapher', component: ContactComponent },
  { path: 'student-list', title: 'Student List', component: StudentlistComponent },
  { path: 'student/:studentId', title: 'Student Details', component: StudentdetailsComponent },
  { path: 'edit-student/:studentId', title: 'Edit Student', component: EditstudentComponent },
  { path: 'add-grade/:studentId', title: 'Add Grade', component: AddgradeComponent },
  { path: 'analyse-grades/:studentId', title: 'Analyse Grade', component: AnalysegradeComponent },
  { path: 'edit-grade/:studentId/:gradeId', title: 'Edit Grade', component: EditgradeComponent },
  { path: 'edit-lesson/:studentId', title: 'Edit Lesson', component: EditlessonComponent },
  { path: 'select-student', title: 'Select Student', component: SelectstudentComponent },
  { path: 'tutor/:tutorId', title: 'Tutor Profile', component: TutorprofileComponent },
  { path: 'create-report-card/:studentId', title: 'Create Report Card', component: CreatereportComponent },
  { path: 'observation-list/:studentId', title: 'Observation List', component: ObservationlistComponent },
  { path: 'add-observation/:studentId', title: 'Add Observation', component: AddobservationComponent },
  { path: 'edit-observation/:studentId/:observationId', title: 'Edit Observation', component: EditobservationComponent },
  { path: 'saved-reports/:studentId', title: 'Saved Reports', component: SavedreportsComponent },
  { path: 'report-repository', title: 'Report Repository', component: ReportrepositoryComponent },
  { path: '**', redirectTo: '',  pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
