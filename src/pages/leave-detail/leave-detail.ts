import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NativeStorage } from "@ionic-native/native-storage";
import { StampService } from '../../service/StampService';
import { AuthenService } from '../../service/AuthenService';

@IonicPage()
@Component({
  selector: 'page-leave-detail',
  templateUrl: 'leave-detail.html',
})
export class LeaveDetailPage {

  public leaveDetail: any;
  public userDetail: any;
  public hr: any;

  constructor(private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, public athService: AuthenService) {
    this.leaveDetail = this.navParams.get('leaveDetail');
    this.nativeStorage.getItem('TimeStampUser').then(
      data => this.getEmployeeData(data.email),
      error => alert(error));
    this.ionViewDidLoad();
  }

  ionViewDidLoad() {

  }

  getEmployeeData(email) {
    this.athService.getEmpDataApi(email).then((emp) => {
      this.userDetail = emp.employees[0];
      if (this.leaveDetail.leaveTime < 2) {
        this.hr = "Hour";
      } else {
        this.hr = "Hours"
      }
    }, (err) => {
      let testErr = JSON.parse(err._body);
      alert(testErr.message);
    });
  }
}
