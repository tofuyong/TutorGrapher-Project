import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorprofileComponent } from './tutorprofile.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { tutorReducer } from 'src/app/store/tutor.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TutorEffects } from 'src/app/store/tutor.effects';
import { SidenavModule } from '../sidenav/sidenav.module';


@NgModule({
  declarations: [
    TutorprofileComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SidenavModule,
    StoreModule.forFeature('tutor', tutorReducer),
    EffectsModule.forFeature([TutorEffects])
  ]
})
export class TutormgtModule { }
