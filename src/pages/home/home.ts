import { Component } from '@angular/core';
import { App, NavController, MenuController } from 'ionic-angular';
import { Login } from '../login/login';
import { StampDetail } from '../stamp-detail/stamp-detail';
import { Register } from '../register/register';
import { Leave } from '../leave/leave';
import { Profile } from '../profile/profile';

import { Vibration } from '@ionic-native/vibration';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeStorage } from '@ionic-native/native-storage';

import { StampService } from '../../service/StampService';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  userdetail: any = {
    employeeprofile: {}
  };
  dataToday: any;
  public dateTimeNow = Date();
  constructor(public app: App, public menu: MenuController, public navCtrl: NavController, private vibration: Vibration, private geolocation: Geolocation, private nativeStorage: NativeStorage, public stmp: StampService) {
    menu.enable(true);
    this.nativeStorage.getItem('TimeStampUser').then(
      data => this.userdetail = data,
      error => alert(error)
    );
    this.nativeStorage.getItem('StampToday').then(
      data => this.dataToday = data,
      error => alert(error)
    );
  }

  showMenu() {
    this.menu.open();
  }

  openPage_stampDetail() {
    // this.navCtrl.push(StampDetail);
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
            this.nativeStorage.setItem('StampToday', data).then(
              (respstamp) => { this.navCtrl.push(StampDetail); }
            ).catch((error) => { alert('Error cant setitem stamptoday : ' + JSON.stringify(error)); });
          }).catch((err) => { alert('Check in Error in stmp : ' + JSON.stringify(err)); });

        } else if (res.status === 'checkin only') {
          res.data.dateTimeOut = new Date();
          res.data.locationOut.lat = resp.coords.latitude;
          res.data.locationOut.lng = resp.coords.longitude;

          this.stmp.stampOut(res.data).then((data) => {
            this.nativeStorage.setItem('StampToday', data).then(
              (respd) => { this.navCtrl.push(StampDetail); },
              // (error) => { alert('Error StampToday'); }
              (errset) => {
                alert("Error SetItem when stampOut :" + JSON.stringify(errset));
              });
          }).catch((err) => {
            alert('Check Out call service Error in stmp : ' + JSON.stringify(err));
          });
        
        } else {
          this.nativeStorage.setItem('StampToday', res.data).then(
            (resp) => { this.navCtrl.push(StampDetail); },
            (error) => { alert('Error StampToday'); }
          );

        }
      }).catch((err) => {
        alert("ERROR check Stamp : " + JSON.stringify(err));
      });
    }).catch((error) => {
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
}
