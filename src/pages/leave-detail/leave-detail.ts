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
  public userDetail: any = [];

  constructor(private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, private stampService: StampService, public athService: AuthenService) {
    this.leaveDetail = this.navParams.get('leaveDetail');
    this.nativeStorage.getItem('TimeStampUser')
      .then(
      data => { this.getEmployeeData(data.email); },
      error => { alert(error); }
      );
    this.ionViewDidLoad();
    // this.nativeStorage.getItem('TimeStampUser').then(
    //   data => {
    //     this.userDetail = data;
    //   },
    //   error => { alert(error); }
    // );

    // this.leaveDetail.leaveStartDateTime = this.stampService.convertDateTimeThaiFormat(this.leaveDetail.leaveStartDateTime);
    // this.leaveDetail.leaveEndDateTime = this.stampService.convertDateTimeThaiFormat(this.leaveDetail.leaveEndDateTime);
    alert("LEAVEDETAIL : "+ JSON.stringify(this.leaveDetail));
  }

  ionViewDidLoad() {
    if (this.leaveDetail.leaveType == "Personal Leave") {
      this.leaveDetail.leaveType = "ลากิจ";
    } else if (this.leaveDetail.leaveType == "Sick Leave") {
      this.leaveDetail.leaveType = "ลาป่วย";
    } else if (this.leaveDetail.leaveType == "Vacation") {
      this.leaveDetail.leaveType = "ลาพักร้อน";
    } else if (this.leaveDetail.leaveType == "Militiary Service Leave") {
      this.leaveDetail.leaveType = "ลาเกณฑ์ทหาร";
    } else if (this.leaveDetail.leaveType == "Maternity Leave") {
      this.leaveDetail.leaveType = "ลาคลอดบุตร";
    } else if (this.leaveDetail.leaveType == "Ordination Leave") {
      this.leaveDetail.leaveType = "ลาบวช";
    }
  }

  getEmployeeData(email) {
    this.athService.getEmpDataApi(email).then((emp) => {
      // alert(JSON.stringify(emp.employees[0]));
      this.userDetail = emp.employees[0];
      // alert("USERDETAIL : " +JSON.stringify(this.userDetail));
    }, (err) => {
      alert(JSON.stringify(err));
    });
  }
}
