import { Component, ViewChild } from '@angular/core';
import { App, Content, LoadingController, MenuController, NavController } from 'ionic-angular';
import { Login } from '../login/login';
import { StampDetail } from '../stamp-detail/stamp-detail';
import { Register } from '../register/register';
import { Leave } from '../leave/leave';
import { Profile } from '../profile/profile';

import { Vibration } from '@ionic-native/vibration';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeStorage } from '@ionic-native/native-storage';
import { Device } from '@ionic-native/device';

import { StampService } from '../../service/StampService';
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
  public getlocation: any = {};
  public dateTimeNow = Date();
  public loader = this.loadingCtrl.create({
    content: "Please wait..."
  });
  public stampdata = {
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
    'dateTimeIn': null,
    'dateTimeOut': null,
    'type': this.devic
  };

  constructor(public app: App, public menu: MenuController, public navCtrl: NavController, private vibration: Vibration,
    private geolocation: Geolocation, private nativeStorage: NativeStorage, public stmp: StampService,
    private loadingCtrl: LoadingController,
    private device: Device) {
    menu.enable(true);
    this.nativeStorage.getItem('TimeStampUser').then(
      data => {
        this.userdetail = data;
        // alert(JSON.stringify(this.userdetail));
        this.stampdata.email = this.userdetail.employeeprofile.email;
        this.callCheckTimeAtt();
        // this.stmp.chkstamp(this.userdetail._id).then((res) => {
        //   // alert(JSON.stringify(res));
        //   if (res.status == "Not checkin") {
        //     { }
        //   } else if (res.status == "checkin only") {
        //     this.dataToday.dateTimeIn = res.data.dateTimeIn;
        //     // this.dataToday.dateTimeOut = res.data.dateTimeOut;
        //     // let dd = new Date(res.data.dateTimeIn);
        //     // let dateLastStamp = dd.getDate();
        //     // let dd2 = new Date(this.dateTimeNow);
        //     // let Today = dd2.getDate();
        //     // if (dateLastStamp != Today) {
        //     //   this.dataToday.dateTimeIn = null;
        //     //   this.dataToday.dateTimeOut = null;
        //     //   // this.loader.dismiss();
        //     // }
        //   } else if (res.status == "checkined today") {
        //     this.dataToday.dateTimeIn = res.data.dateTimeIn;
        //     this.dataToday.dateTimeOut = res.data.dateTimeOut;
        //     // let dd = new Date(res.data.dateTimeIn);
        //     // let dateLastStamp = dd.getDate();
        //     // let dd2 = new Date(this.dateTimeNow);
        //     // let Today = dd2.getDate();
        //     // if (dateLastStamp != Today) {
        //     //   this.dataToday.dateTimeIn = null;
        //     //   this.dataToday.dateTimeOut = null;
        //     // }
        //   }
        //   // this.loader.present();

        //   // alert('date from stmp : ' + dateLastStamp + ', DateToday : ' + Today);
        //   // alert(JSON.stringify(res.data.dateTimeIn) + " : " + JSON.stringify(res.data.dateTimeOut));
        //   // alert(JSON.stringify(this.dataToday.dateTimeIn) + " : " + JSON.stringify(this.dataToday.dateTimeOut));
        //   // this.loader.dismiss();
        // }).catch((err) => {
        //   this.dataToday.dateTimeIn = null;
        //   this.dataToday.dateTimeOut = null;
        //   // this.loader.dismiss();
        // });
        //Mick Add test
      },
      error => this.rootPage = Register
    );

  }
  callCheckTimeAtt() {
    this.stmp.chkstamp(this.userdetail._id).then((res) => {
      if (res.status == "Not checkin") {
        { }
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
    // this.nativeStorage.getItem('StampToday').then(
    //   data => this.dataToday = data,
    //   error => { }
    // );
    setInterval(() => {
      this.dateTimeNow = Date();
    }, 1000);
    this.callCheckTimeAtt();
    // this.nativeStorage.getItem('TimeStampUser').then(
    //   data => this.userdetail = data,
    //   error => this.rootPage = TabsPage
    // );
    // this.stmp.chkstamp(this.userdetail._id).then((res) => {
    //   this.dataToday.dateTimeIn = res.data.dateTimeIn;
    //   this.dataToday.dateTimeOut = res.data.dateTimeOut;
    //   // this.loader.present();
    //   // let dd = new Date(res.data.dateTimeIn);
    //   // let dateLastStamp = dd.getDate();
    //   // let dd2 = new Date(this.dateTimeNow);
    //   // let Today = dd2.getDate();
    //   // if (dateLastStamp != Today) {
    //   //   this.dataToday.dateTimeIn = null;
    //   //   this.dataToday.dateTimeOut = null;
    //   // }
    //   // alert('date from stmp : ' + dateLastStamp + ', DateToday : ' + Today);
    //   // alert(JSON.stringify(res.data.dateTimeIn) + " : " + JSON.stringify(res.data.dateTimeOut));
    //   // alert(JSON.stringify(this.dataToday.dateTimeIn) + " : " + JSON.stringify(this.dataToday.dateTimeOut));
    //   // this.loader.dismiss();
    // }).catch((err) => {
    //   this.dataToday.dateTimeIn = null;
    //   this.dataToday.dateTimeOut = null;
    //   // this.loader.dismiss();
    // });

  };

  showMenu() {
    this.menu.open();
  };

  stampFn() {
    this.stmp.chkstamp(this.userdetail._id).then((res) => {
      if (res.status === '' || res.status === 'Not checkin') {
        this.stampdata.dateTimeIn = new Date();
        this.stampdata.locationIn.lat = this.getlocation.lat;
        this.stampdata.locationIn.lng = this.getlocation.lng;

        this.stmp.stampIn(this.stampdata).then((data) => {
          this.loader.dismiss();
          this.nativeStorage.setItem('StampToday', data).then(
            () => this.navCtrl.push(StampDetail),
            // alert('Stamptoday Data : ' + JSON.stringify(data)); 
            error => alert('Error cannot setitem stamptoday! : ' + JSON.stringify(error)));
        }).catch((err) => {
          this.loader.dismiss();
          let testErr = JSON.parse(err._body);
          alert('Check in error! : ' + testErr.message);
        });

      } else if (res.status === 'checkin only') {
        this.stampdata = res.data;
        this.stampdata.dateTimeOut = new Date();
        this.stampdata.locationOut.lat = this.getlocation.lat;
        this.stampdata.locationOut.lng = this.getlocation.lng;
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
    this.loader.present();
    this.vibration.vibrate(200);
    let GeolocationOptions = { timeout: 5000 };
    this.geolocation.getCurrentPosition(GeolocationOptions).then((resp) => {
      this.getlocation.lat = resp.coords.latitude;
      this.getlocation.lng = resp.coords.longitude;
      // alert('LC : ' + JSON.stringify(resp.coords.latitude) + " : " + JSON.stringify(resp.coords.longitude));
      if (resp.coords.latitude && resp.coords.longitude) {
        this.stampFn();
      }
    }).catch((error) => {
      this.loader.dismiss();
      alert("Cannot stamp!! \nPlease turn on GPS or Location service");
      // let testErr = JSON.parse(error._body);
      // alert('Error getting location : ' + testErr.message);
    });
  };


  openPage_login() {
    this.navCtrl.push(Login);
  };
  openPage_regis() {
    this.navCtrl.push(Register);
  };
  openPage_leave() {
    this.app.getRootNav().push(Leave);
  };
  openPage_profile() {
    this.app.getRootNav().push(Profile);
  };
  logout() {
    this.nativeStorage.clear();
    this.app.getRootNav().popToRoot();
    setTimeout(() => {
      this.app.getRootNav().push(Login);
    }, 100);
  };

  doClick() {
    this.menu.open();
  };
}
