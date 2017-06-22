import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Device } from '@ionic-native/device';
import { Register } from '../register/register';
import { AuthenService } from '../../service/AuthenService';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  private did: any;
  public inemail: any;

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, private device: Device, public auth: AuthenService, private nativeStorage: NativeStorage, private loadingCtrl: LoadingController) {
    this.did = this.device.uuid;
  }

  openPage_home() {
    this.app.getRootNav().push(TabsPage);
  }
  Login(inemail) {
    let loader = this.loadingCtrl.create({
      content: "กรุณารอสักครู่..."
    });
    loader.present();
    if (inemail) {
      let signin = {
        username: inemail.split('@')[0],
        password: this.device.uuid.substr(0, 10) + '#Pass'
      };

      this.auth.signIn(signin).then((data) => {
        this.nativeStorage.setItem('TimeStampUser', data).then(
          (data) => { },
          error => alert("Cannot storing User data"));
          loader.dismiss();
        this.navCtrl.setRoot(TabsPage);
      }, (err) => {
        loader.dismiss();
        let testErr = JSON.parse(err._body);
        alert(testErr.message);
      })
    }
  }
  GotoReg() {
    this.app.getRootNav().push(Register);
  }
}
