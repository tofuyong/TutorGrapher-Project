import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ObservationlistComponent } from './observationlist.component';
import { AddobservationComponent } from './addobservation.component';
import { EditobservationComponent } from './editobservation.component';


@NgModule({
  declarations: [
    ObservationlistComponent,
    AddobservationComponent,
    EditobservationComponent
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
export class ObservationmgtModule { }
