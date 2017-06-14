import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from "@ionic-native/native-storage";

@IonicPage()
@Component({
  selector: 'page-leave-detail',
  templateUrl: 'leave-detail.html',
})
export class LeaveDetailPage {

  public leaveDetail :any;
  public userDetail: any;
  
  constructor(private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams) {
    this.leaveDetail = this.navParams.get('leaveDetail');
    this.nativeStorage.getItem('TimeStampUser').then(
      data => {
        this.userDetail = data;
      },
      error => alert(error)
    );
  }

  ionViewDidLoad() {
    
  }

}
