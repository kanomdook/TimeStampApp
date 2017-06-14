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
  userdetail = {
    employeeprofile: {}
  };
  dataToday = {
    locationOut: {},
    locationIn: {},
    user: {},
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage) {
    this.ionViewDidLoad();
  }

  ionViewDidLoad() {

    this.nativeStorage.getItem('TimeStampUser')
      .then(
      data => this.userdetail = data,
      error => alert(error)
      );

    this.nativeStorage.getItem('StampToday')
      .then(
      data => this.dataToday = data,
      error => alert(error)
      );

  }
  openPageProfile() {
    this.navCtrl.push(Profile);
  }

}
