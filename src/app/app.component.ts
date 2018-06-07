import { Component } from '@angular/core';
import { App, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { Register } from '../pages/register/register';
// import { LeaveDetailPage } from '../pages/leave-detail/leave-detail';

import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(public app: App, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private nativeStorage: NativeStorage) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      setTimeout(() => {
        splashScreen.hide();
      }, 100);
      this.nativeStorage.getItem('TimeStampUser').then(
        res => this.rootPage = TabsPage,
        error =>
          this.rootPage = Register
        //  this.rootPage = TabsPage
        // this.rootPage = LeaveDetailPage;
      );
    });

  }
}
