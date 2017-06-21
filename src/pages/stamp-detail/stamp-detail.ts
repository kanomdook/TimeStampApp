import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../profile/profile';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-stamp-detail',
  templateUrl: 'stamp-detail.html',
})
export class StampDetail {
  public userdetail:any = {};
  public dataToday:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage) {

      this.nativeStorage.getItem('TimeStampUser').then(
        data => {
          // this.userdetail = JSON.stringify(data);    
           this.userdetail = data.employeeprofile;  
        }
        ,
        error => alert("Get TimeStampUser Error : " + JSON.stringify(error))
      );

      this.nativeStorage.getItem('StampToday')
        .then(
        data => {
          this.dataToday = data;
        },
        error => alert("Get Datatoday Error : " + JSON.stringify(error))
        );
  }

  openPageProfile() {
    this.navCtrl.push(Profile);
  }

}
