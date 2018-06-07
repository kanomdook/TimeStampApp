import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveDetailPage } from './leave-detail';

@NgModule({
  declarations: [
    LeaveDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaveDetailPage),
  ],
  exports: [
    LeaveDetailPage
  ]
})
export class LeaveDetailPageModule {}
