import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AboutComponent } from './about.component';
import { ContactComponent } from './contact.component';
import { LoadingComponent } from './loading.component';

@NgModule({
  declarations: [
    AboutComponent,
    ContactComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  exports: [
    LoadingComponent
  ]
})
export class SidenavModule { }
