import { Component, ViewChild } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

import { StampService } from '../../service/StampService';
import { NativeStorage } from '@ionic-native/native-storage';
import { LeaveDetailPage } from "../leave-detail/leave-detail";
/**
 * Generated class for the History page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class History {
  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;
  Work: string = "Worked";
  user: any = {};
  date = new Date();
  year = this.date.getFullYear();
  month = this.date.getMonth() + 1;
  YM = this.year.toString() + this.month.toString();
  public workList: any = [];
  public leaveList: any = [];

  constructor(private app: App, public navCtrl: NavController, public navParams: NavParams, public stmp: StampService, private nativeStorage: NativeStorage) {
    this.nativeStorage.getItem("TimeStampUser").then((data) => {
      this.user = data;
      this.stmp.getworkStampList(this.YM, this.user).then((resp) => {
        this.workList = resp;
      }).catch(() => {
        alert("Error when getting History data List");
      });

      this.stmp.getLeaveList(this.user).then((resp) => {
        this.leaveList = resp;
      }).catch(() => {
        alert("Error when getting Leave List");
      });
    }).catch((err) => {
      alert("Error to get User Data : " + JSON.stringify(err));
    });
  }

  ionViewDidLoad() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'doughnut',
      data: {
        labels: ["จำนวนวันทำงานทั้งหมด", "จำนวนวันที่ทำงาน", "จำนวนวันที่ลา"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3],
          backgroundColor: [
            'rgba(173, 173, 173, 1)',
            'rgba(57, 237, 2, 1)',
            'rgba(255, 195, 30, 1)'
          ],
          hoverBackgroundColor: [
            'rgba(173, 173, 173, 0.5)',
            'rgba(57, 237, 2, 0.5)',
            'rgba(255, 195, 30,0.5)'
          ]
        }]
      }

    });
  }

  openLeaveDetailPage(item) {
    this.app.getRootNav().push(LeaveDetailPage, { leaveDetail: item });
  }
}