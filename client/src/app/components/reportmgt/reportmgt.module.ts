import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CommonModule } from '@angular/common';
import { CreatereportComponent } from './createreport.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SavedreportsComponent } from './savedreports.component';
import { ReportrepositoryComponent } from './reportrepository.component';

@NgModule({
  declarations: [
    CreatereportComponent,
    SavedreportsComponent,
    ReportrepositoryComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule
  ]
})
export class ReportmgtModule { }
