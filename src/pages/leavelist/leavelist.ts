// import { Component } from '@angular/core';
import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(private app: App, private nativeStorage: NativeStorage, private stampService: StampService, public navCtrl: NavController, public navParams: NavParams) {
    this.nativeStorage.getItem('TimeStampUser').then(
      data => {
        this.user = data;
        this.stampService.getLeaveList(this.user).then((res) => {
          this.leavelist = res.filter(this.filterLeaveList);
        }).catch(() => {
          alert('error getLeaveList');
        })
      },
      error => { alert(error); }
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
