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

import { StampService } from '../../service/StampService';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  toast: any;
  userdetail: any = {};
  dataToday: any = {};
  public dateTimeNow = Date();
  constructor(public app: App, public menu: MenuController, public navCtrl: NavController, private vibration: Vibration, private geolocation: Geolocation, private nativeStorage: NativeStorage, public stmp: StampService, private loadingCtrl: LoadingController, private network: Network, public toastCtrl: ToastController) {
    menu.enable(true);
    this.nativeStorage.getItem('TimeStampUser').then(
      data => this.userdetail = data,
      error => alert("Get User Data error : " + JSON.stringify(error))
    );
    this.nativeStorage.getItem('StampToday').then(
      data => this.dataToday = data,
      error => { }
    );
    this.network.onDisconnect().subscribe(() => {
      this.toast = this.toastCtrl.create({
        message: 'ไม่สามารถเชื่อมต่ออินเทอร์เน็ตได้',
        // duration: 3000,
        position: 'top'
      });
      this.toast.present();
    });
    this.network.onConnect().subscribe(() => {
      //     setTimeout(() => {
      //   if (this.network.type === 'wifi') {
      //     alert('we got a wifi connection, woohoo!');
      //   }
      // }, 3000);
      // alert("เน็ตใช้ได้แว้ววว");
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
    this.nativeStorage.getItem('StampToday').then(
      data => {
        let Today = new Date();
        let Day = Today.getDate();
        let Old = JSON.parse(this.dataToday.dateTimeIn);
        let Olds = new Date(Old);
        let OldDay = Olds.getDate();
        // alert("DAY : " + Day + "  OldDay : " + OldDay);
        if (Day != OldDay) {
          this.nativeStorage.remove('StampToday');
          this.dataToday = {};
        } else {
          this.dataToday = data;
        }

      },
      error => { }
    );
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
            'dateTimeIn': new Date()
          };

          this.stmp.stampIn(stampdata).then((data) => {
            loader.dismiss();
            this.nativeStorage.setItem('StampToday', data).then(
              () => {
                // alert('Stamptoday Data : ' + JSON.stringify(data)); 
                this.navCtrl.push(StampDetail);
              },
              error => alert('Error cant setitem stamptoday : ' + JSON.stringify(error)));

          }).catch((err) => { loader.dismiss(); alert('Check in Error in stmp : ' + JSON.stringify(err)); });

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
            alert('Check Out call service Error in stmp : ' + JSON.stringify(err));
          });
        } else {
          loader.dismiss();
          this.nativeStorage.setItem('StampToday', res.data).then(
            () => this.navCtrl.push(StampDetail),
            error => alert('Error StampToday'));
        }
      }).catch((err) => {
        loader.dismiss();
        alert("ERROR check Stamp : " + JSON.stringify(err));
      });
    }).catch((error) => {
      loader.dismiss();
      alert('Error getting location');
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
