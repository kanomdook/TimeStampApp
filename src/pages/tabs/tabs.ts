import { Component } from '@angular/core';

import { History } from '../history/history';
import { Request } from '../request/request';
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  tab1Root = HomePage;
  tab2Root = History;
  tab3Root = Request;
  toast: any;
  constructor(private network: Network, public toastCtrl: ToastController) {
    this.network.onDisconnect().subscribe(() => {
      this.toast = this.toastCtrl.create({
        message: 'No Internet Connection!',
        // duration: 3000,
        position: 'top',
        cssClass: 'toastTextCenter'
      });
      this.toast.present();
    });
    this.network.onConnect().subscribe(() => {
      this.toast.dismiss();
    });
  }

}
