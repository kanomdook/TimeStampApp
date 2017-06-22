import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { DatePickerModule } from 'datepicker-ionic2';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';
import { StampDetail } from '../pages/stamp-detail/stamp-detail';
import { Register } from '../pages/register/register';
import { Leave } from '../pages/leave/leave';
import { Leavelist } from '../pages/leavelist/leavelist';
import { Profile } from '../pages/profile/profile';
import { History } from '../pages/history/history';
import { Request } from '../pages/request/request';
import { LeaveDetailPage } from '../pages/leave-detail/leave-detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { Vibration } from '@ionic-native/vibration';
import { Device } from '@ionic-native/device';
import { HTTP } from '@ionic-native/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';

import { AuthenService } from '../service/AuthenService';
import { StampService } from '../service/StampService';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '2fccffbb'
  }
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    Login,
    StampDetail,
    Register,
    Leave,
    Leavelist,
    Profile,
    History,
    Request,
    LeaveDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    DatePickerModule,
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    Login,
    StampDetail,
    Register,
    Leave,
    Leavelist,
    Profile,
    History,
    Request,
    LeaveDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Vibration,
    Device,
    HTTP,
    AuthenService,
    StampService,
    NativeStorage,
    Geolocation,
    Network, 
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
