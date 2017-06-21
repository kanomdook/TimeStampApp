// import { Component } from '@angular/core';
import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { StampService } from '../../service/StampService';
import { NativeStorage } from '@ionic-native/native-storage';
import { Leave } from "../leave/leave";

@IonicPage()
@Component({
  selector: 'page-leavelist',
  templateUrl: 'leavelist.html'
})
export class Leavelist {
  private user: any;
  public leavelist: any;

  constructor(private app: App, private nativeStorage: NativeStorage, private stampService: StampService, public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController) {
    let loader = this.loadingCtrl.create({
      content: "กรุณารอสักครู่..."
    });
    loader.present();
    this.nativeStorage.getItem('TimeStampUser').then(
      data => {
        this.user = data;
        this.stampService.getLeaveList(this.user).then((res) => {
          loader.dismiss();
          this.leavelist = res.filter(this.filterLeaveList);
        }).catch(() => {
          alert('error getLeaveList');
        })
      },
      error => alert(error)
    );
  }

  ionViewDidLoad() {

  }

  filterLeaveList(list) {
    return list.leaveStatus == 'Draft';
  }

  editLeave(item) {
    this.app.getRootNav().push(Leave, { leaveData: item });
  }

}
