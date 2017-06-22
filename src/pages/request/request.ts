import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LeaveDetailPage } from '../leave-detail/leave-detail';

import { StampService } from '../../service/StampService';
import { NativeStorage } from '@ionic-native/native-storage';
/**
 * Generated class for the Request page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-request',
  templateUrl: 'request.html',
})
export class Request {
  Req: string = "Leave";
  leaveData: any = [];
  leaveList: any = [];
  user: any;
  constructor(private app: App, public navCtrl: NavController, public navParams: NavParams, public stmp: StampService, private nativeStorage: NativeStorage, private loadingCtrl: LoadingController) {
   
  }
  viewLeaveDetail(item) {
    this.app.getRootNav().push(LeaveDetailPage, { leaveDetail: item });
  }
  ionViewDidEnter() {
    let loader = this.loadingCtrl.create({
      content: "กรุณารอสักครู่..."
    });
    loader.present();
    this.nativeStorage.getItem("TimeStampUser").then(
      data => {
        // alert(" User Data : " + JSON.stringify(data));
        this.user = data;
        // Call Get Leave List
        this.stmp.getLeaveList(this.user).then((resp) => {
          // alert("response is : " + JSON.stringify(resp));
          loader.dismiss();
          this.leaveList = resp;
        }).catch((error) => {
          alert("Error when getting Leave List : " + JSON.stringify(error));
        });
        // Cal; get Leave List
      }, error => alert("Error to get User Data : " + JSON.stringify(error))
    );
  }
  doRefresh(refresher) {
    this.stmp.getLeaveList(this.user).then((resp) => {
      // alert("response is : " + JSON.stringify(resp));
      this.leaveList = resp;
      refresher.complete();
    }).catch(() => {
      alert("Error when getting Leave List");
    });
    // setTimeout(() => {
    // console.log('Async operation has ended');
    // }, 2000);
  }
}
