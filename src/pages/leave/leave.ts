import { Component } from '@angular/core';
import { App, ModalController, IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { Leavelist } from '../leavelist/leavelist';
import { StampService } from '../../service/StampService';
import { NativeStorage } from '@ionic-native/native-storage';
import { DatePicker } from '@ionic-native/date-picker';
import { TabsPage } from '../tabs/tabs';

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

  constructor(private datePicker: DatePicker, private app: App, public modal: ModalController, public navCtrl: NavController, public navParams: NavParams, public stmp: StampService, private nativeStorage: NativeStorage, private loadingCtrl: LoadingController, public menu: MenuController) {
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
    this.menu.close();
    this.navCtrl.pop();
  }

  getDateFrom() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => {
        this.localStartDate = date;
        if (this.localStartDate && this.localEndDate) {
          this.checkDate(this.localStartDate, this.localEndDate);
        }
      },
      err => {}
      );
  }
  getDateTo() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => {
        this.localEndDate = date;
        if (this.localStartDate && this.localEndDate) {
          this.checkDate(this.localStartDate, this.localEndDate);
        }
      },
      err => {}
      );
  }

  checkDate(date1, date2) {
    if (date1 > date2) {
      alert("From date must be less than To date");
      this.localStartDate = '';
      this.localEndDate = '';
      this.leaveData.leaveStartDateTime = '';
      this.leaveData.leaveEndDateTime = '';
    } else {
      this.leaveData.leaveStartDateTime = this.localStartDate;
      this.leaveData.leaveEndDateTime = this.localEndDate;
    }
  }

  sendLeave(intype) {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    this.leaveData.leaveDay = this.dateDif(this.leaveData.leaveStartDateTime, this.leaveData.leaveEndDateTime);
    if (!this.leaveData.leaveType) {
      loader.dismiss();
      alert("Please select Leave Type.");
    } else if (!this.leaveData.leaveStartDateTime && !this.leaveData.leaveEndDateTime) {
      loader.dismiss();
      alert("Please select Start Date and End Date.");
    } else if (!this.leaveData.leaveStartDateTime || !this.leaveData.leaveStartDateTime) {
      loader.dismiss();
      alert("Please select Start Date or End Date.");
    } else if (!this.leaveData.leaveDetail) {
      loader.dismiss();
      alert("Please complete the leave details.");
    } else if (this.leaveData.leaveType && this.leaveData.leaveStartDateTime && this.leaveData.leaveEndDateTime && this.leaveData.leaveDetail) {
      if (!this.leaveData._id) {
        this.leaveData.approveStatus = "Waiting";
        this.leaveData.leaveStatus = intype;
        this.stmp.createLeave(this.leaveData).then((resp) => {
          if (intype == 'Draft') {
            alert("Save draft complete.");
            loader.dismiss();
            this.app.getRootNav().push(Leavelist);
          } else if (intype == 'Request') {
            alert("Send leave complete.");
            loader.dismiss();
            this.menu.close();
            this.navCtrl.pop();
          }
        }).catch((err) => {
          loader.dismiss();
          let testErr = JSON.parse(err._body);
          alert("Error on Create Leave service : " + testErr.message);
        })
      } else if (this.leaveData._id) {
        this.leaveData.leaveStatus = intype;
        this.leaveData.approveStatus = "Waiting";
        this.stmp.editLeave(this.leaveData).then((resp) => {
          if (intype == 'Draft') {
            alert("Save draft complete.");
            loader.dismiss();
            this.app.getRootNav().push(Leavelist);
          } else if (intype == 'Request') {
            alert("Send leave complete.");
            loader.dismiss();
            this.menu.close();
            setTimeout(() => {
              this.app.getRootNav().push(TabsPage);
            }, 100);
          }
        }).catch((err) => {
          loader.dismiss();
          let testErr = JSON.parse(err._body);
          alert("Error on Edit Leave service : " + testErr.message);
        });
      }
    } else { loader.dismiss(); }
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
