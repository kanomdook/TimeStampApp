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


  constructor(private app: App, public navCtrl: NavController, public navParams: NavParams, public stmp: StampService, private nativeStorage: NativeStorage) {
    this.nativeStorage.getItem("TimeStampUser").then(
      data => {
        this.user = data;

        this.stmp.getworkStampList(this.YM, this.user).then((resp) => {
          this.workList = resp;
          this.workDays = resp.length;
          // alert("Stamp : " + JSON.stringify(resp));
          // this.ionViewDidLoad();
        }).catch((err) => {
          alert("Error when getting History data List : "+ JSON.stringify(err));
        });

        this.stmp.getLeaveList(this.user).then((resp) => {
          this.leaveList = resp.filter(this.filterLeaveApprove);
          this.leaveDays = resp.filter(this.filterLeaveApprove).length;
          this.showChart();
        }).catch((err) => {
          alert("Error when getting Leave List"+JSON.stringify(err));
        });

      }, err => alert("Error to get User Data : " + JSON.stringify(err)));
  }

  // ionViewDidLoad() {


  doRefresh(refresher) {
    this.stmp.getworkStampList(this.YM, this.user).then((resp) => {
      this.workList = resp;
      this.workDays = resp.length;
    }).catch((err) => {
      alert("Error when getting History data List : " + JSON.stringify(err));
    });
    this.stmp.getLeaveList(this.user).then((resp) => {
      this.leaveList = resp.filter(this.filterLeaveApprove);
      this.leaveDays = resp.filter(this.filterLeaveApprove).length;
      this.showChart();
      refresher.complete();
    }).catch((err) => {
      alert("Error when getting Leave List : " + JSON.stringify(err));
    });
    // setTimeout(() => {
    // console.log('Async operation has ended')
  }

  showChart() {
    // มาตรวจสอบฟังก์ชั่นด้วย
    // alert("Workday : " + JSON.stringify(this.workDays) + " , " + "LeaveDay : " + JSON.stringify(this.leaveDays));
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'doughnut',
      data: {
        labels: ["จำนวนวันที่ทำงาน", "จำนวนวันที่ลา"],
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
  }

  openLeaveDetailPage(item) {
    this.app.getRootNav().push(LeaveDetailPage, { leaveDetail: item });
  }
  filterLeaveApprove(list) {
    return list.approveStatus == 'Approve';
  }
}