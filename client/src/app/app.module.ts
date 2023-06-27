import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NgChartsModule } from 'ng2-charts';
import { StudentmgtModule } from './components/studentmgt/studentmgt.module';
import { GrademgtModule } from './components/grademgt/grademgt.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TutormgtModule } from './components/tutormgt/tutormgt.module';
import { LessonmgtModule } from './components/lessonmgt/lessonmgt.module';
import { EffectsModule } from '@ngrx/effects';
import { ReportmgtModule } from './components/reportmgt/reportmgt.module';
import { ObservationmgtModule } from './components/observationmgt/observationmgt.module';
import { SidenavModule } from './components/sidenav/sidenav.module';
import { StoreModule } from '@ngrx/store';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    NgChartsModule,
    StudentmgtModule,
    GrademgtModule,
    TutormgtModule,
    ReportmgtModule,
    LessonmgtModule,
    ObservationmgtModule,
    SidenavModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
