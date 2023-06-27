import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CommonModule } from '@angular/common';
import { AddgradeComponent } from './addgrade.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { AnalysegradeComponent } from './analysegrade.component';
import { EditgradeComponent } from './editgrade.component';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AddgradeComponent,
    AnalysegradeComponent,
    EditgradeComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgChartsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule
  ]
})
export class GrademgtModule { }
