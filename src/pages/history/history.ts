import { Component, ViewChild } from '@angular/core';
import { App, IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
  user: any;
  date = new Date();
  year = this.date.getFullYear();
  month = this.date.getMonth() + 1;
  YM = this.year.toString() + this.month.toString();
  public workList: any = [];
  public leaveList: any = [];
  public workDays: any;
  public leaveDays: any;
  // public workDays: any = {};
  // public leaveDays: any = {};


  constructor(private app: App, public navCtrl: NavController, public navParams: NavParams, public stmp: StampService, private nativeStorage: NativeStorage, private loadingCtrl: LoadingController) {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.nativeStorage.getItem("TimeStampUser").then(
      data => {
        this.user = data;

        this.stmp.getworkStampList(this.YM, this.user).then((resp) => {
          loader.dismiss();
          this.workList = resp;
          this.workDays = resp.length;
          // alert("Stamp : " + JSON.stringify(resp));
          // this.ionViewDidLoad();
        }).catch((err) => {
          loader.dismiss();
          let testErr = JSON.parse(err._body);
          alert(testErr.message);
          // alert("Error when getting History data List : " + JSON.stringify(err));
        });

        this.stmp.getLeaveList(this.user).then((resp) => {
          this.leaveList = resp.filter(this.filterLeaveApprove);
          this.leaveDays = resp.filter(this.filterLeaveApprove).length;
          loader.dismiss();
          this.showChart();
        }).catch((err) => {
          loader.dismiss();
          let testErr = JSON.parse(err._body);
          alert(testErr.message);
        });

      }, err => alert("Error to get User Data : " + JSON.stringify(err)));
  }

  // ionViewDidLoad() {


  doRefresh(refresher) {
    this.stmp.getworkStampList(this.YM, this.user).then((resp) => {
      this.workList = resp;
      this.workDays = resp.length;
    }).catch((err) => {
      let testErr = JSON.parse(err._body);
      alert("Error when getting History data List : " + testErr.message);
    });
    this.stmp.getLeaveList(this.user).then((resp) => {
      this.leaveList = resp.filter(this.filterLeaveApprove);
      this.leaveDays = resp.filter(this.filterLeaveApprove).length;
      this.showChart();
      refresher.complete();
    }).catch((err) => {
      let testErr = JSON.parse(err._body);
      alert("Error when getting Leave List : " + testErr.message);
    });
    // setTimeout(() => {
    // console.log('Async operation has ended')
  }

  showChart() {
    setTimeout(() =>  {
      this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
        type: 'doughnut',
        data: {
          labels: ["Working days", "Leave days"],
          //  labels: ["จำนวนวันทำงานทั้งหมด", "จำนวนวันที่ทำงาน", "จำนวนวันที่ลา"],
          datasets: [{
            label: '# of Votes',
            data: [JSON.stringify(this.workDays), JSON.stringify(this.leaveDays)],
            // data: [25, this.workDays, this.leaveDays],
            backgroundColor: [
              // 'rgba(173, 173, 173, 1)',
              'rgba(57, 237, 2, 1)',
              'rgba(255, 195, 30, 1)'
            ],
            hoverBackgroundColor: [
              // 'rgba(173, 173, 173, 0.5)',
              'rgba(57, 237, 2, 0.5)',
              'rgba(255, 195, 30,0.5)'
            ]
          }]
        }

      });
    },200);

  }

  openLeaveDetailPage(item) {
    this.app.getRootNav().push(LeaveDetailPage, { leaveDetail: item });
  }
  filterLeaveApprove(list) {
    return list.approveStatus == 'Approve';
  }
}