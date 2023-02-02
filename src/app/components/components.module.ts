import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalMessageComponent } from './modal-message/modal-message.component';


@NgModule({
  declarations: [
    ModalMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ModalMessageComponent
  ]
})
export class ComponentsModule { }
