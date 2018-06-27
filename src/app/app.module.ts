import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

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
import { HttpClientModule } from '@angular/common/http';
import { Vibration } from '@ionic-native/vibration';
import { Device } from '@ionic-native/device';
import { HTTP } from '@ionic-native/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { DatePicker } from '@ionic-native/date-picker';

import { AuthenService } from '../service/AuthenService';
import { StampService } from '../service/StampService';

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
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    DatePickerModule
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
    UniqueDeviceID,
    Network,
    DatePicker,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
