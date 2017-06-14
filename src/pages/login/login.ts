import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
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
  public did: any;

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, private device: Device, public auth: AuthenService, private nativeStorage: NativeStorage) {

  }

  ionViewDidLoad() {
    this.did = this.device.uuid;
  }

  openPage_home() {
    this.app.getRootNav().push(TabsPage);
  }
  Login(inemail) {
    if (inemail) {
      let signin = {
        username: inemail.split('@')[0],
        password: this.device.uuid.substr(0, 10) + '#Pass'
      };

      this.auth.signIn(signin).then((data) => {
        this.nativeStorage.setItem('TimeStampUser', data).then(
          (res) => { null },
          error => alert('Error storing item')
        );
        this.navCtrl.setRoot(TabsPage);
      }, (err) => {
        alert(JSON.stringify(err));
      })
    }
  }
  GotoReg() {
    this.app.getRootNav().push(Register);
  }
}
