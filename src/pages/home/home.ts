import { Component, ViewChild } from '@angular/core';
import { App, Content, LoadingController, MenuController, NavController } from 'ionic-angular';
import { Login } from '../login/login';
import { StampDetail } from '../stamp-detail/stamp-detail';
import { Register } from '../register/register';
import { Leave } from '../leave/leave';
import { Profile } from '../profile/profile';
import { NativeStorage } from '@ionic-native/native-storage';
import { Device } from '@ionic-native/device';
import { StampService } from '../../service/StampService';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild(Content) content: Content;
  rootPage: any;
  userdetail: any = {};
  dataToday: any = {
    'dateTimeIn': null,
    'dateTimeOut': null,
  };
  devic: string = this.device.platform;
  public dateTimeNow: any = Date();
  public loader: any = this.loadingCtrl.create({
    content: "Please wait..."
  });
  public stampdata: any = {
    'locationIn':
    {
      'lat': '',
      'lng': ''
    },
    'locationOut':
    {
      'lat': '',
      'lng': ''
    },
    'email': '',
    'user': '',
    'dateTimeIn': null,
    'dateTimeOut': null,
    'type': this.devic
  };

  constructor(public app: App, public menu: MenuController, public navCtrl: NavController,
    private nativeStorage: NativeStorage, public stmp: StampService,
    private loadingCtrl: LoadingController, private geolocation: Geolocation,
    private device: Device) {
    menu.enable(true);
    this.nativeStorage.getItem('TimeStampUser').then(
      data => {
        this.userdetail = data;
        this.stampdata.email = this.userdetail.employeeprofile.email;
        this.callCheckTimeAtt();
      },
      error => this.rootPage = Register
    );

    //for chrome test//
    // this.userdetail = {
    //   _id: '5b18e324fc455f2e00887b71'
    // };
    // this.stampdata.email = 'popveera@hotmail.com';
    // this.callCheckTimeAtt();

    //

  }
  callCheckTimeAtt() {
    this.stmp.chkstamp(this.userdetail._id).then((res) => {
      if (res.status == "Not checkin") {

      } else if (res.status == "checkin only") {
        this.dataToday.dateTimeIn = res.data.dateTimeIn;
      } else if (res.status == "checkined today") {
        this.dataToday.dateTimeIn = res.data.dateTimeIn;
        this.dataToday.dateTimeOut = res.data.dateTimeOut;
      }
    }).catch((err) => {
      this.dataToday.dateTimeIn = null;
      this.dataToday.dateTimeOut = null;
    });
  }
  ionViewDidEnter() {
    setInterval(() => {
      this.dateTimeNow = Date();
    }, 1000);
    this.callCheckTimeAtt();
  };

  showMenu() {
    this.menu.open();
  };

  stampFn(lat, lng) {
    this.loader.present();
    this.stmp.chkstamp(this.userdetail._id).then((res) => {
      if (res.status === '' || res.status === 'Not checkin') {
        this.stampdata.user = this.userdetail._id;
        this.stampdata.dateTimeIn = new Date();
        this.stampdata.locationIn.lat = lat;
        this.stampdata.locationIn.lng = lng;
        this.stmp.stampIn(this.stampdata).then(data => {
          this.loader.dismiss();
          this.nativeStorage.setItem('StampToday', data);
          this.navCtrl.push(StampDetail);
        }).catch(err => {
          this.loader.dismiss();
          alert(JSON.stringify(err));
        });
      } else if (res.status === 'checkin only') {
        this.stampdata = res.data;
        this.stampdata.dateTimeOut = new Date();
        this.stampdata.locationOut.lat = lat;
        this.stampdata.locationOut.lng = lng;
        this.stmp.stampOut(this.stampdata).then((data) => {
          this.loader.dismiss();
          this.nativeStorage.setItem('StampToday', data).then(
            () => this.navCtrl.push(StampDetail),
            error => alert('Error! SetItem when stampOut'));
        }).catch((err) => {
          this.loader.dismiss();
          let testErr = JSON.parse(err._body);
          alert('Check Out call service Error in stmp : ' + testErr.message);
        });
      } else {
        this.loader.dismiss();
        this.nativeStorage.setItem('StampToday', res.data).then(
          () => this.navCtrl.push(StampDetail),
          error => alert('Error StampToday'));
      }
    }).catch((err) => {
      this.loader.dismiss();
      let testErr = JSON.parse(err._body);
      alert("ERROR check Stamp : " + testErr.message);
    });
  };

  openPage_stampDetail() {
    alert('stamp!');
    this.stampFn('13.9005307', '100.6385391');
    // this.geolocation.getCurrentPosition().then((resp) => {
    //   let lat = resp.coords.latitude;
    //   let lng = resp.coords.longitude;
    //   this.stampFn(lat, lng);
    // }).catch((error) => {
    //   alert(error);
    // });
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

  doClick() {
    this.menu.open();
  }
}
