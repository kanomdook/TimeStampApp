import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Device } from '@ionic-native/device';
import { Register } from '../register/register';
import { AuthenService } from '../../service/AuthenService';
import { NativeStorage } from '@ionic-native/native-storage';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  // private did: any;
  public inemail: any;
  private deviceUUID: any;
  constructor(private uniqueDeviceID: UniqueDeviceID, public app: App, public navCtrl: NavController, public navParams: NavParams, private device: Device, public auth: AuthenService, private nativeStorage: NativeStorage, private loadingCtrl: LoadingController) {
    if (this.device.platform == "iOS") {
      this.uniqueDeviceID.get()
        .then((uuid: any) => this.deviceUUID = uuid)
        .catch((error: any) => alert("Error getting device information on iOS!\nPlease contact support team."));
    } else if (this.device.platform == "Android") {
      this.deviceUUID = this.device.uuid;
      // alert(this.device.uuid);
    }
    // this.did = this.device.uuid;
    // this.did = '7ef823544ff64e4';
  }

  openPage_home() {
    this.app.getRootNav().push(TabsPage);
  }
  Login(inemail) {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    if (inemail) {
      let signin = {
        username: inemail.split('@')[0],
        password: this.deviceUUID ? this.deviceUUID.substr(0, 10) + '#Pass' : ''
        // password: '7ef823544f#Pass'
      };

      this.auth.signIn(signin).then((dataresp) => {

        this.nativeStorage.setItem('TimeStampUser', dataresp).then(
          (data) => { },
          error => alert("Cannot storing User data"));

        loader.dismiss();
        this.navCtrl.setRoot(TabsPage);
      }).catch((err) => {
        loader.dismiss();
        alert('Sign in error!\n' + JSON.stringify(err));
      });
    }
  }
  GotoReg() {
    this.app.getRootNav().push(Register);
  }
}
