import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormTaxComponent } from './formtax.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [
    FormTaxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: FormTaxComponent,
      },
    ]),
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    ComponentsModule
  ],
})
export class FormTaxModule {}
