import { Component } from '@angular/core';
import { App, NavController, MenuController, LoadingController, ToastController } from 'ionic-angular';
import { Login } from '../login/login';
import { StampDetail } from '../stamp-detail/stamp-detail';
import { Register } from '../register/register';
import { Leave } from '../leave/leave';
import { Profile } from '../profile/profile';

import { Vibration } from '@ionic-native/vibration';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeStorage } from '@ionic-native/native-storage';
import { Network } from '@ionic-native/network';
import { Device } from '@ionic-native/device';

import { StampService } from '../../service/StampService';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  toast: any;
  userdetail: any = {};
  dataToday: any = {};
  devic: string = this.device.platform;
  public dateTimeNow = Date();
  constructor(public app: App, public menu: MenuController, public navCtrl: NavController, private vibration: Vibration, private geolocation: Geolocation, private nativeStorage: NativeStorage, public stmp: StampService, private loadingCtrl: LoadingController, private network: Network, public toastCtrl: ToastController, private device: Device) {
    menu.enable(true);
    this.nativeStorage.getItem('TimeStampUser').then(
      data => {
        this.userdetail = data;
      },
      error => alert("Get User Data error : " + JSON.stringify(error))
    );
    this.nativeStorage.getItem('StampToday').then(
      data => this.dataToday = data,
      error => { }
    );
    this.network.onDisconnect().subscribe(() => {
      this.toast = this.toastCtrl.create({
        message: 'No Internet Connection!',
        // duration: 3000,
        position: 'top',
        cssClass: 'toastTextCenter'
      });
      this.toast.present();
    });
    this.network.onConnect().subscribe(() => {
      this.toast.dismiss();
    });
  }

  ionViewDidEnter() {
    setInterval(() => {
      this.dateTimeNow = Date();
    }, 1000);
    this.nativeStorage.getItem('TimeStampUser').then(
      data => this.userdetail = data,
      error => alert("Get User Data error : " + JSON.stringify(error))
    );
    this.stmp.chkstamp(this.userdetail._id).then((res) => {
      let dd = new Date(res.data.dateTimeIn);
      let dateLastStamp = dd.getDate();
      let dd2 = new Date(this.dateTimeNow);
      let Today = dd2.getDate();
      if (dateLastStamp != Today) {
        this.dataToday.dateTimeIn = '';
        this.dataToday.dateTimeOut = '';
      }
      // alert('date from stmp : ' + dd1 + ', DateToday : ' + dd3);
    });
  }

  showMenu() {
    this.menu.open();
  }
  openPage_stampDetail() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.vibration.vibrate(200);
    this.geolocation.getCurrentPosition().then((resp) => {
      this.stmp.chkstamp(this.userdetail._id).then((res) => {
        if (res.status === '' || res.status === 'Not checkin') {
          let stampdata = {
            'locationIn':
            {
              'lat': resp.coords.latitude,
              'lng': resp.coords.longitude
            },
            'locationOut':
            {
              'lat': '',
              'lng': ''
            },
            'email': this.userdetail.employeeprofile.email,
            'dateTimeIn': new Date(),
            'type': this.devic
          };

          this.stmp.stampIn(stampdata).then((data) => {
            loader.dismiss();
            this.nativeStorage.setItem('StampToday', data).then(
              () => {
                // alert('Stamptoday Data : ' + JSON.stringify(data)); 
                this.navCtrl.push(StampDetail);
              },
              error => alert('Error cant setitem stamptoday : ' + JSON.stringify(error)));

          }).catch((err) => {
            loader.dismiss();
            let testErr = JSON.parse(err._body);
            alert('Check in Error in stmp : ' + testErr.message);
          });

        } else if (res.status === 'checkin only') {
          res.data.dateTimeOut = new Date();
          res.data.locationOut.lat = resp.coords.latitude;
          res.data.locationOut.lng = resp.coords.longitude;

          this.stmp.stampOut(res.data).then((data) => {
            loader.dismiss();
            this.nativeStorage.setItem('StampToday', data).then(
              () => { this.navCtrl.push(StampDetail); },
              error => alert("Error SetItem when stampOut :" + JSON.stringify(error)));

          }).catch((err) => {
            loader.dismiss();
            let testErr = JSON.parse(err._body);
            alert('Check Out call service Error in stmp : ' + testErr.message);
          });
        } else {
          loader.dismiss();
          this.nativeStorage.setItem('StampToday', res.data).then(
            () => this.navCtrl.push(StampDetail),
            error => alert('Error StampToday'));
        }
      }).catch((err) => {
        loader.dismiss();
        let testErr = JSON.parse(err._body);
        alert("ERROR check Stamp : " + testErr.message);
      });
    }).catch((error) => {
      loader.dismiss();
      let testErr = JSON.parse(error._body);
      alert('Error getting location : ' + testErr.message);
    });
  }
  openPage_login() {
    this.navCtrl.push(Login);
  }
  openPage_regis() {
    this.navCtrl.push(Register);
  }
  openPage_leave() {
    this.app.getRootNav().push(Leave);
  }
  openPage_profile() {
    this.app.getRootNav().push(Profile);
  }
  logout() {
    this.nativeStorage.clear();
    this.app.getRootNav().popToRoot();
    setTimeout(() => {
      this.app.getRootNav().push(Login);
    }, 100);
  }
  toastErrorHandle(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      // duration: 3000,
      position: 'top'
    });
    toast.present();
  };
}
