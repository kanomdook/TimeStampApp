import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StampDetail } from './stamp-detail';

@NgModule({
  declarations: [
    StampDetail,
  ],
  imports: [
    IonicPageModule.forChild(StampDetail),
  ],
  exports: [
    StampDetail
  ]
})
export class StampDetailModule {}
