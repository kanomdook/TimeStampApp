import { Component } from '@angular/core';
import { App, ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Leavelist } from '../leavelist/leavelist';
import { StampService } from '../../service/StampService';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-leave',
  templateUrl: 'leave.html',
})
export class Leave {
  public localStartDate: any;
  public localEndDate: any;
  public userdetail: any;
  public leaveData: any = {};
  public leaveDraftArr: any = [];

  constructor(private app: App, public modal: ModalController, public navCtrl: NavController, public navParams: NavParams, public stmp: StampService, private nativeStorage: NativeStorage) {
    this.nativeStorage.getItem('TimeStampUser').then(
      data => {
        this.userdetail = data;
        this.leaveData.email = this.userdetail.email;
      },
      error => alert(error)
    );

    if (this.navParams.get('leaveData')) {
      this.leaveData = this.navParams.get('leaveData');
      this.localStartDate = this.leaveData.leaveStartDateTime;
      this.localEndDate = this.leaveData.leaveEndDateTime;
    }

  }

  openModalpage() {
    this.navCtrl.push(Leavelist);
  }
  openHomepage() {
    this.navCtrl.pop();
  }

  setStartDate($event) {
    this.localStartDate = $event;
    this.leaveData.leaveStartDateTime = $event;
  }

  setEndDate($event) {
    this.localEndDate = $event;
    this.leaveData.leaveEndDateTime = $event;
  }
  sendLeave(intype) {
    this.leaveData.leaveDay = this.dateDif(this.leaveData.leaveStartDateTime, this.leaveData.leaveEndDateTime);

    if (!this.leaveData.leaveType) {
      alert("Please select Leave Type!");
    } else if (!this.leaveData.leaveStartDateTime && !this.leaveData.leaveEndDateTime) {
      alert("Please select Start Date and End Date");
    } else if (!this.leaveData.leaveStartDateTime || !this.leaveData.leaveStartDateTime) {
      alert("Please select Start Date or End Date");
    } else if (this.leaveData.leaveType && this.leaveData.leaveStartDateTime && this.leaveData.leaveEndDateTime) {
      if (!this.leaveData._id) {
        this.leaveData.approveStatus = "Waitting";
        this.leaveData.leaveStatus = intype;
        this.stmp.createLeave(this.leaveData).then((resp) => {
          this.app.getRootNav().push(Leavelist);
        }).catch((err) => {
          alert("Error on Create Leave service");
        })
      } else if (this.leaveData._id) {
        this.leaveData.leaveStatus = intype;
        this.leaveData.approveStatus = "Waitting";
        this.stmp.editLeave(this.leaveData).then((resp) => {
          this.navCtrl.pop();
        }).catch((err) => {
          alert("Error on Edit Leave service");
        })
      }
    }
  }

  dateDif(strDate1, strDate2) {
    var theDate1 = Date.parse(strDate1) / 1000;
    var theDate2 = Date.parse(strDate2) / 1000;
    var diff = (theDate2 - theDate1) / (60 * 60 * 24);
    return Math.floor(diff) + 1;
  }

  logEvent() {
    if (this.leaveData.leaveHalf == false) {
      this.leaveData.leaveTime = "";
    } else if (this.leaveData.leaveHalf == true) {
      this.leaveData.leaveEndDateTime = this.leaveData.leaveStartDateTime;
      this.localEndDate = this.leaveData.leaveEndDateTime;
    }
  }
}
