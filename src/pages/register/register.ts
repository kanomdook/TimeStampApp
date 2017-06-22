import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Http } from '@angular/http'; //Headers
import 'rxjs/add/operator/toPromise';
import { Device } from '@ionic-native/device';
import { Login } from '../login/login';

import { AuthenService } from '../../service/AuthenService';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {

  constructor(public http: Http, public app: App, public navCtrl: NavController, public navParams: NavParams, public athService: AuthenService, private device: Device, private nativeStorage: NativeStorage) {

  }
  gotoLogin() {
    this.app.getRootNav().push(Login);
  }
  register(email) {
    if (email) {
      this.athService.getEmpDataApi(email).then((data) => {
        if (data.employees.length > 0) {
          let register = {
            firstName: email.split('@')[0],
            lastName: '@' + email.split('@')[1],
            email: email,
            username: email.split('@')[0],
            password: this.device.uuid.substr(0, 10) + '#Pass',
            deviceID: this.device.uuid,
            employeeprofile: data.employees[0]
          }
          this.athService.signUp(register).then((data) => {
            this.nativeStorage.setItem('TimeStampUser', data).then(
              () => { },
              error => alert("Cannot storing User data"));
            this.navCtrl.setRoot(TabsPage);
          }, (err) => {
            let testErr = JSON.parse(err._body);
            alert(testErr.message);
          });
        } else {
          alert("This Email is not Employee!!");
        }
      }, (err) => {
        alert(err);
      });
    }
  }



}
