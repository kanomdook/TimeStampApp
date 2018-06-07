import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Leavelist } from './leavelist';

@NgModule({
  declarations: [
    Leavelist,
  ],
  imports: [
    IonicPageModule.forChild(Leavelist),
  ],
  exports: [
    Leavelist
  ]
})
export class LeavelistModule {}
