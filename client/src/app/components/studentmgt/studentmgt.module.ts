import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CommonModule } from '@angular/common';
import { StudentdetailsComponent } from './studentdetails.component';
import { MaterialModule } from 'src/app/material.module';
import { StudentlistComponent } from './studentlist.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditstudentComponent } from './editstudent.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { StudentReducer } from 'src/app/store/student.reducer';
import { StudentEffects } from 'src/app/store/student.effects';
import { EffectsModule } from '@ngrx/effects';
import { SelectstudentComponent } from './selectstudent.component';
import { TabReducer } from 'src/app/store/tab.reducer';

@NgModule({
  declarations: [
    StudentlistComponent,
    StudentdetailsComponent,
    EditstudentComponent,
    SelectstudentComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    StoreModule.forFeature('students', StudentReducer),
    StoreModule.forFeature('tab', TabReducer),
    EffectsModule.forFeature([StudentEffects])
  ]
})
export class StudentmgtModule { }
