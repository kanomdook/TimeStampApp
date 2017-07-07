import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Http } from '@angular/http'; //Headers
import 'rxjs/add/operator/toPromise';
import { Device } from '@ionic-native/device';
import { Login } from '../login/login';

import { AuthenService } from '../../service/AuthenService';
import { NativeStorage } from '@ionic-native/native-storage';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {
  private deviceUUID: any;
  public loader = this.loadingCtrl.create({
    content: "Please wait..."
  });
  constructor(private uniqueDeviceID: UniqueDeviceID, public http: Http, public app: App, public navCtrl: NavController, public navParams: NavParams, public athService: AuthenService, private device: Device, private nativeStorage: NativeStorage, private loadingCtrl: LoadingController) {
    if (this.device.platform == " iOS") {
      this.uniqueDeviceID.get()
      .then((uuid: any) => this.deviceUUID = uuid)
      .catch((error: any) => alert("Error getting device information on iOS!\nPlease contact support team."));
    } else if (this.device.platform == "Android") {
      this.deviceUUID = this.device.uuid;
    }

  }
  gotoLogin() {
    this.app.getRootNav().push(Login);
  }
  register(email) {
    this.loader.present();
    if (email) {
      this.athService.getEmpDataApi(email).then((data) => {
        if (data.employees.length > 0) {
          let register = {
            firstName: email.split('@')[0],
            lastName: '@' + email.split('@')[1],
            email: email,
            username: email.split('@')[0],
            password: this.deviceUUID.substr(0, 10) + '#Pass',
            deviceID: this.deviceUUID,
            employeeprofile: data.employees[0]
          }
          this.athService.signUp(register).then((data) => {
            this.nativeStorage.setItem('TimeStampUser', data).then(
              () => { },
              error => alert("Cannot storing User data"));
              this.loader.dismiss();
            this.navCtrl.setRoot(TabsPage);
          }, (err) => {
            let testErr = JSON.parse(err._body);
            this.loader.dismiss();
            alert(testErr.message);
          });
        } else {
          this.loader.dismiss();
          alert("This Email is not Employee!!");
        }
      }, (err) => {
        let testErr = JSON.parse(err._body);
        this.loader.dismiss();
        alert(testErr.message);
      });
    }this.loader.dismiss();
    alert('Please fill your email.');
  }



}
