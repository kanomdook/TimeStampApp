import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

import { AuthenService } from '../../service/AuthenService';

/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {
  public empDetail: any;
  // public empDetail = {
  //   user: {},
  //   office: {
  //     address: {}
  //   }
  // };
  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage, public athService: AuthenService, private loadingCtrl: LoadingController) {
    this.ionViewDidLoad();
  }

  ionViewDidLoad() {

    this.nativeStorage.getItem('TimeStampUser')
      .then(
      data => this.getEmployeeData(data.email),
      error => alert(error)
      );

  }

  getEmployeeData(email) {
    let loader = this.loadingCtrl.create({
      content: "กรุณารอสักครู่..."
    });
    loader.present();
    this.athService.getEmpDataApi(email).then((emp) => {
      alert(JSON.stringify(emp.employees[0]));
      this.empDetail = emp.employees[0];
      loader.dismiss();
    }, (err) => {
      alert(JSON.stringify(err));
    });
  }

}
