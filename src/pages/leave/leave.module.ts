import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Leave } from './leave';

@NgModule({
  declarations: [
    Leave,
  ],
  imports: [
    IonicPageModule.forChild(Leave),
  ],
  exports: [
    Leave
  ]
})
export class LeaveModule {}
