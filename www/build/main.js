webpackJsonp([9],{

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return History; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_StampService__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__leave_detail_leave_detail__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the History page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var History = /** @class */ (function () {
    // public workDays: any = {};
    // public leaveDays: any = {};
    function History(app, navCtrl, navParams, stmp, nativeStorage, loadingCtrl) {
        var _this = this;
        this.app = app;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.stmp = stmp;
        this.nativeStorage = nativeStorage;
        this.loadingCtrl = loadingCtrl;
        this.Work = "Worked";
        this.date = new Date();
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth() + 1;
        this.YM = this.year.toString() + this.month.toString();
        this.workList = [];
        this.leaveList = [];
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        this.nativeStorage.getItem("TimeStampUser").then(function (data) {
            _this.user = data;
            _this.stmp.getworkStampList(_this.YM, _this.user).then(function (resp) {
                loader.dismiss();
                _this.workList = resp;
                _this.workDays = resp.length;
                // alert("Stamp : " + JSON.stringify(resp));
                // this.ionViewDidLoad();
            }).catch(function (err) {
                loader.dismiss();
                var testErr = JSON.parse(err._body);
                alert(testErr.message);
                // alert("Error when getting History data List : " + JSON.stringify(err));
            });
            _this.stmp.getLeaveList(_this.user).then(function (resp) {
                _this.leaveList = resp.filter(_this.filterLeaveApprove);
                _this.leaveDays = resp.filter(_this.filterLeaveApprove).length;
                loader.dismiss();
                _this.showChart();
            }).catch(function (err) {
                loader.dismiss();
                var testErr = JSON.parse(err._body);
                alert(testErr.message);
            });
        }, function (err) { return alert("Error to get User Data : " + JSON.stringify(err)); });
    }
    // ionViewDidLoad() {
    History.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.stmp.getworkStampList(this.YM, this.user).then(function (resp) {
            _this.workList = resp;
            _this.workDays = resp.length;
        }).catch(function (err) {
            var testErr = JSON.parse(err._body);
            alert("Error when getting History data List : " + testErr.message);
        });
        this.stmp.getLeaveList(this.user).then(function (resp) {
            _this.leaveList = resp.filter(_this.filterLeaveApprove);
            _this.leaveDays = resp.filter(_this.filterLeaveApprove).length;
            _this.showChart();
            refresher.complete();
        }).catch(function (err) {
            var testErr = JSON.parse(err._body);
            alert("Error when getting Leave List : " + testErr.message);
        });
        // setTimeout(() => {
        // console.log('Async operation has ended')
    };
    History.prototype.showChart = function () {
        var _this = this;
        setTimeout(function () {
            _this.doughnutChart = new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](_this.doughnutCanvas.nativeElement, {
                type: 'doughnut',
                data: {
                    labels: ["Working days", "Leave days"],
                    //  labels: ["จำนวนวันทำงานทั้งหมด", "จำนวนวันที่ทำงาน", "จำนวนวันที่ลา"],
                    datasets: [{
                            label: '# of Votes',
                            data: [JSON.stringify(_this.workDays), JSON.stringify(_this.leaveDays)],
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
        }, 200);
    };
    History.prototype.openLeaveDetailPage = function (item) {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_5__leave_detail_leave_detail__["a" /* LeaveDetailPage */], { leaveDetail: item });
    };
    History.prototype.filterLeaveApprove = function (list) {
        return list.approveStatus == 'Approve';
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('doughnutCanvas'),
        __metadata("design:type", Object)
    ], History.prototype, "doughnutCanvas", void 0);
    History = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-history',template:/*ion-inline-start:"/Users/cybermacpro15/Desktop/TimeAttendant/timeattendant/src/pages/history/history.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>History</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content></ion-refresher-content>\n    </ion-refresher>\n    <div class="chart-container" maintainAspectRatio="true">\n        <canvas #doughnutCanvas></canvas>\n        <!--<canvas #doughnutCanvas width="50%" height="50%" text-center></canvas>-->\n    </div>\n    <ion-item-divider color="light"></ion-item-divider>\n    <div>\n        <ion-segment [(ngModel)]="Work">\n            <ion-segment-button value="Worked">\n                Worked\n            </ion-segment-button>\n            <ion-segment-button value="Leaved">\n                Leaved\n            </ion-segment-button>\n        </ion-segment>\n    </div>\n\n    <div [ngSwitch]="Work">\n        <ion-list *ngSwitchCase="\'Worked\'">\n            <ion-item *ngFor="let worklis of workList">\n                <ion-row rowHeight>\n                    <ion-col col-2>\n                        <ion-icon name="calendar" iconCalendar></ion-icon>\n                    </ion-col>\n                    <ion-col>\n                        <ion-row rowHeightspace>\n                            <h2 headList>{{worklis.dateTimeIn | date: "dd MMM yyyy"}}</h2>\n                        </ion-row>\n                        <ion-row rowHeightspace>\n                            <ion-icon name="md-arrow-dropright-circle" iconinList1></ion-icon>{{worklis.dateTimeIn | date: "shortTime"}}\n                            <ion-icon name="md-arrow-dropleft-circle" iconinList2></ion-icon>{{worklis.dateTimeOut | date: "shortTime"}}\n                        </ion-row>\n                    </ion-col>\n                </ion-row>\n            </ion-item>\n        </ion-list>\n\n        <ion-list *ngSwitchCase="\'Leaved\'">\n            <ion-item *ngFor="let leaveLis of leaveList" (click)="openLeaveDetailPage(leaveLis)">\n                <ion-row rowHeight>\n                    <ion-col col-2>\n                        <ion-icon name="calendar" iconCalendar></ion-icon>\n                    </ion-col>\n                    <ion-col>\n                        <ion-row rowHeightspace>\n                            <h2 headList>{{leaveLis.leaveType}} : {{leaveLis.leaveStartDateTime | date: "dd MMM yyyy"}}</h2>\n                        </ion-row>\n                        <ion-row rowHeightspace>\n                            <ion-col col-10 text-left>\n                                <p class="thaifont">{{leaveLis.leaveDetail}}</p>\n                            </ion-col>\n                            <ion-col col-2 text-right>\n                                <ion-icon name="md-checkmark-circle" [hidden]="leaveLis.approveStatus != \'Approve\'" iconApprove></ion-icon>\n                                <ion-icon name="md-time" [hidden]="leaveLis.approveStatus != \'Waitting\'" iconWait></ion-icon>\n                                <ion-icon name="md-close-circle" [hidden]="leaveLis.approveStatus != \'Reject\'" iconReject></ion-icon>\n                            </ion-col>\n                        </ion-row>\n                    </ion-col>\n                </ion-row>\n            </ion-item>\n        </ion-list>\n    </div>\n</ion-content>'/*ion-inline-end:"/Users/cybermacpro15/Desktop/TimeAttendant/timeattendant/src/pages/history/history.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__service_StampService__["a" /* StampService */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], History);
    return History;
}());

//# sourceMappingURL=history.js.map

/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Leavelist; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_StampService__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__leave_leave__ = __webpack_require__(68);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// import { Component } from '@angular/core';





var Leavelist = /** @class */ (function () {
    function Leavelist(app, nativeStorage, stampService, navCtrl, navParams, loadingCtrl) {
        this.app = app;
        this.nativeStorage = nativeStorage;
        this.stampService = stampService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        // let loader = this.loadingCtrl.create({
        //   content: "Please wait..."
        // });
        // loader.present();
        // this.nativeStorage.getItem('TimeStampUser').then(
        //   data => {
        //     this.user = data;
        //     this.stampService.getLeaveList(this.user).then((res) => {
        //       loader.dismiss();
        //       this.leavelist = res.filter(this.filterLeaveList);
        //     }).catch((err) => {
        //       loader.dismiss();
        //       alert('error getLeaveList : ' + JSON.stringify(err));
        //     })
        //   },
        //   error => alert(error)
        // );
    }
    Leavelist.prototype.ionViewDidEnter = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        this.nativeStorage.getItem('TimeStampUser').then(function (data) {
            _this.user = data;
            _this.stampService.getLeaveList(_this.user).then(function (res) {
                loader.dismiss();
                _this.leavelist = res.filter(_this.filterLeaveList);
            }).catch(function (err) {
                var testErr = JSON.parse(err._body);
                loader.dismiss();
                alert('error getLeaveList : ' + testErr.message);
            });
        }, function (error) { return alert(error); });
    };
    Leavelist.prototype.ionViewDidLoad = function () {
    };
    Leavelist.prototype.filterLeaveList = function (list) {
        return list.leaveStatus == 'Draft';
    };
    Leavelist.prototype.editLeave = function (item) {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_4__leave_leave__["a" /* Leave */], { leaveData: item });
    };
    Leavelist = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-leavelist',template:/*ion-inline-start:"/Users/cybermacpro15/Desktop/TimeAttendant/timeattendant/src/pages/leavelist/leavelist.html"*/'<ion-header>\n\n    <ion-navbar>\n        <ion-title>Leave List</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-list>\n        <ion-item *ngFor="let leave of leavelist" (click)="editLeave(leave)">\n            <ion-icon name="calendar" item-left iconN></ion-icon>\n            <b class="thaifont">{{ leave.leaveType }}</b>\n            <ion-note>\n                <p class="thaifont">{{ leave.leaveStartDateTime | date: "dd MMM yyyy"}} - {{ leave.leaveEndDateTime | date: "dd MMM yyyy"}}</p>\n            </ion-note>\n            <p class="thaifont">{{ leave.remark }}</p>\n        </ion-item>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/cybermacpro15/Desktop/TimeAttendant/timeattendant/src/pages/leavelist/leavelist.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_2__service_StampService__["a" /* StampService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], Leavelist);
    return Leavelist;
}());

//# sourceMappingURL=leavelist.js.map

/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Request; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__leave_detail_leave_detail__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_StampService__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the Request page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Request = /** @class */ (function () {
    function Request(app, navCtrl, navParams, stmp, nativeStorage, loadingCtrl) {
        this.app = app;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.stmp = stmp;
        this.nativeStorage = nativeStorage;
        this.loadingCtrl = loadingCtrl;
        this.Req = "Leave";
        this.leaveData = [];
        this.leaveList = [];
    }
    Request.prototype.viewLeaveDetail = function (item) {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_2__leave_detail_leave_detail__["a" /* LeaveDetailPage */], { leaveDetail: item });
    };
    Request.prototype.ionViewDidEnter = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        this.nativeStorage.getItem("TimeStampUser").then(function (data) {
            // alert(" User Data : " + JSON.stringify(data));
            _this.user = data;
            // Call Get Leave List
            _this.stmp.getLeaveList(_this.user).then(function (resp) {
                // alert("response is : " + JSON.stringify(resp));
                loader.dismiss();
                _this.leaveList = resp.filter(_this.filterLeaveRequest);
            }).catch(function (error) {
                var testErr = JSON.parse(error._body);
                alert("Error when getting Leave List : " + testErr.message);
            });
            // Cal; get Leave List
        }, function (error) { return alert("Error to get User Data : " + JSON.stringify(error)); });
    };
    Request.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.stmp.getLeaveList(this.user).then(function (resp) {
            // alert("response is : " + JSON.stringify(resp));
            _this.leaveList = resp.filter(_this.filterLeaveRequest);
            refresher.complete();
        }).catch(function (error) {
            var testErr = JSON.parse(error._body);
            alert("Error when getting Leave List : " + testErr.message);
        });
        // setTimeout(() => {
        // console.log('Async operation has ended');
        // }, 2000);
    };
    Request.prototype.filterLeaveRequest = function (list) {
        return list.leaveStatus == 'Request';
    };
    Request = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-request',template:/*ion-inline-start:"/Users/cybermacpro15/Desktop/TimeAttendant/timeattendant/src/pages/request/request.html"*/'<ion-header>\n\n    <ion-navbar>\n        <ion-title>Request</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    <!--<div>\n        <ion-segment [(ngModel)]="Req">\n            <ion-segment-button value="Leave">\n                Leave\n            </ion-segment-button>\n            <ion-segment-button value="Adjust">\n                Adjust\n            </ion-segment-button>\n        </ion-segment>\n    </div>-->\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content></ion-refresher-content>\n    </ion-refresher>\n    <ion-list>\n        <ion-item *ngFor="let leaveLis of leaveList">\n            <ion-row rowHeight (click)="viewLeaveDetail(leaveLis)">\n                <ion-col col-2>\n                    <ion-icon name="calendar" iconCalendar></ion-icon>\n                </ion-col>\n                <ion-col>\n                    <ion-row rowHeightspace>\n                        <h2 headList>{{leaveLis.leaveType}} : {{leaveLis.leaveStartDateTime | date: "dd MMM yyyy"}}</h2>\n                    </ion-row>\n                    <ion-row rowHeightspace>\n                        <ion-col col-10 text-left>\n                            <p class="thaifont">{{leaveLis.leaveDetail}}</p>\n                        </ion-col>\n                        <ion-col col-2 text-right>\n                            <ion-icon name="md-checkmark-circle" [hidden]="leaveLis.approveStatus != \'Approve\'" iconApprove></ion-icon>\n                            <ion-icon name="md-time" [hidden]="leaveLis.approveStatus != \'Waiting\'" iconWait></ion-icon>\n                            <ion-icon name="md-close-circle" [hidden]="leaveLis.approveStatus != \'Reject\'" iconReject></ion-icon>\n                        </ion-col>\n                    </ion-row>\n                </ion-col>\n            </ion-row>\n        </ion-item>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/cybermacpro15/Desktop/TimeAttendant/timeattendant/src/pages/request/request.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__service_StampService__["a" /* StampService */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], Request);
    return Request;
}());

//# sourceMappingURL=request.js.map

/***/ }),

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StampDetail; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_profile__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StampDetail = /** @class */ (function () {
    function StampDetail(navCtrl, navParams, nativeStorage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nativeStorage = nativeStorage;
        this.userdetail = {};
        this.dataToday = {};
        this.nativeStorage.getItem('TimeStampUser').then(function (data) {
            // this.userdetail = JSON.stringify(data);    
            _this.userdetail = data.employeeprofile;
        }, function (error) { return alert("Get TimeStampUser Error : " + JSON.stringify(error)); });
        this.nativeStorage.getItem('StampToday')
            .then(function (data) {
            _this.dataToday = data;
        }, function (error) { return alert("Get Datatoday Error : " + JSON.stringify(error)); });
    }
    StampDetail.prototype.openPageProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__profile_profile__["a" /* Profile */]);
    };
    StampDetail = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-stamp-detail',template:/*ion-inline-start:"/Users/cybermacpro15/Desktop/TimeAttendant/timeattendant/src/pages/stamp-detail/stamp-detail.html"*/'<ion-header>\n\n    <ion-navbar>\n        <ion-title>Stamp Detail</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content no-padding>\n\n    <ion-grid class="mt-img">\n        <ion-row>\n            <ion-col text-center>\n                <img src="{{userdetail.image}}" (click)="openPageProfile()" width="164px" height="164px">\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col text-center>\n                <span class="fl">{{userdetail.firstname}} {{userdetail.lastname}}</span>\n            </ion-col>\n        </ion-row>\n        <ion-list no-lines>\n            <ion-item>\n                <ion-icon name="md-arrow-dropright-circle" iconinList1 item-left></ion-icon>\n                <h2>{{dataToday.dateTimeIn | date: "shortTime"}}</h2>\n                <p>{{dataToday.dateTimeIn | date: "dd MMM yyyy"}}</p>\n            </ion-item>\n            <ion-item>\n                <ion-icon name="md-arrow-dropleft-circle" iconinList2 item-left></ion-icon>\n                <h2 ng-if="dataToday.dateTimeOut">{{dataToday.dateTimeOut | date: "shortTime"}}</h2>\n                <p ng-if="dataToday.dateTimeOut">{{dataToday.dateTimeOut | date: "dd MMM yyyy"}}</p>\n            </ion-item>\n        </ion-list>\n\n    </ion-grid>\n</ion-content>'/*ion-inline-end:"/Users/cybermacpro15/Desktop/TimeAttendant/timeattendant/src/pages/stamp-detail/stamp-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__["a" /* NativeStorage */]])
    ], StampDetail);
    return StampDetail;
}());

//# sourceMappingURL=stamp-detail.js.map

/***/ }),

/***/ 137:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 137;

/***/ }),

/***/ 179:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/history/history.module": [
		487,
		8
	],
	"../pages/leave-detail/leave-detail.module": [
		489,
		7
	],
	"../pages/leave/leave.module": [
		488,
		6
	],
	"../pages/leavelist/leavelist.module": [
		490,
		5
	],
	"../pages/login/login.module": [
		491,
		4
	],
	"../pages/profile/profile.module": [
		492,
		3
	],
	"../pages/register/register.module": [
		493,
		2
	],
	"../pages/request/request.module": [
		494,
		1
	],
	"../pages/stamp-detail/stamp-detail.module": [
		495,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 179;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stamp_detail_stamp_detail__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__register_register__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__leave_leave__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__profile_profile__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_vibration__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_native_storage__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_device__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__service_StampService__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var HomePage = /** @class */ (function () {
    function HomePage(app, menu, navCtrl, vibration, geolocation, nativeStorage, stmp, loadingCtrl, device) {
        var _this = this;
        this.app = app;
        this.menu = menu;
        this.navCtrl = navCtrl;
        this.vibration = vibration;
        this.geolocation = geolocation;
        this.nativeStorage = nativeStorage;
        this.stmp = stmp;
        this.loadingCtrl = loadingCtrl;
        this.device = device;
        this.userdetail = {};
        this.dataToday = {
            'dateTimeIn': null,
            'dateTimeOut': null,
        };
        this.devic = this.device.platform;
        this.getlocation = {};
        this.dateTimeNow = Date();
        this.loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        this.stampdata = {
            'locationIn': {
                'lat': '',
                'lng': ''
            },
            'locationOut': {
                'lat': '',
                'lng': ''
            },
            'email': '',
            'dateTimeIn': null,
            'dateTimeOut': null,
            'type': this.devic
        };
        menu.enable(true);
        this.nativeStorage.getItem('TimeStampUser').then(function (data) {
            _this.userdetail = data;
            // alert(JSON.stringify(this.userdetail));
            _this.stampdata.email = _this.userdetail.employeeprofile.email;
            _this.callCheckTimeAtt();
            // this.stmp.chkstamp(this.userdetail._id).then((res) => {
            //   // alert(JSON.stringify(res));
            //   if (res.status == "Not checkin") {
            //     { }
            //   } else if (res.status == "checkin only") {
            //     this.dataToday.dateTimeIn = res.data.dateTimeIn;
            //     // this.dataToday.dateTimeOut = res.data.dateTimeOut;
            //     // let dd = new Date(res.data.dateTimeIn);
            //     // let dateLastStamp = dd.getDate();
            //     // let dd2 = new Date(this.dateTimeNow);
            //     // let Today = dd2.getDate();
            //     // if (dateLastStamp != Today) {
            //     //   this.dataToday.dateTimeIn = null;
            //     //   this.dataToday.dateTimeOut = null;
            //     //   // this.loader.dismiss();
            //     // }
            //   } else if (res.status == "checkined today") {
            //     this.dataToday.dateTimeIn = res.data.dateTimeIn;
            //     this.dataToday.dateTimeOut = res.data.dateTimeOut;
            //     // let dd = new Date(res.data.dateTimeIn);
            //     // let dateLastStamp = dd.getDate();
            //     // let dd2 = new Date(this.dateTimeNow);
            //     // let Today = dd2.getDate();
            //     // if (dateLastStamp != Today) {
            //     //   this.dataToday.dateTimeIn = null;
            //     //   this.dataToday.dateTimeOut = null;
            //     // }
            //   }
            //   // this.loader.present();
            //   // alert('date from stmp : ' + dateLastStamp + ', DateToday : ' + Today);
            //   // alert(JSON.stringify(res.data.dateTimeIn) + " : " + JSON.stringify(res.data.dateTimeOut));
            //   // alert(JSON.stringify(this.dataToday.dateTimeIn) + " : " + JSON.stringify(this.dataToday.dateTimeOut));
            //   // this.loader.dismiss();
            // }).catch((err) => {
            //   this.dataToday.dateTimeIn = null;
            //   this.dataToday.dateTimeOut = null;
            //   // this.loader.dismiss();
            // });
            //Mick Add test
        }, function (error) { return _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__register_register__["a" /* Register */]; });
    }
    HomePage.prototype.callCheckTimeAtt = function () {
        var _this = this;
        this.stmp.chkstamp(this.userdetail._id).then(function (res) {
            if (res.status == "Not checkin") {
                { }
            }
            else if (res.status == "checkin only") {
                _this.dataToday.dateTimeIn = res.data.dateTimeIn;
            }
            else if (res.status == "checkined today") {
                _this.dataToday.dateTimeIn = res.data.dateTimeIn;
                _this.dataToday.dateTimeOut = res.data.dateTimeOut;
            }
        }).catch(function (err) {
            _this.dataToday.dateTimeIn = null;
            _this.dataToday.dateTimeOut = null;
        });
    };
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        // this.nativeStorage.getItem('StampToday').then(
        //   data => this.dataToday = data,
        //   error => { }
        // );
        setInterval(function () {
            _this.dateTimeNow = Date();
        }, 1000);
        this.callCheckTimeAtt();
        // this.nativeStorage.getItem('TimeStampUser').then(
        //   data => this.userdetail = data,
        //   error => this.rootPage = TabsPage
        // );
        // this.stmp.chkstamp(this.userdetail._id).then((res) => {
        //   this.dataToday.dateTimeIn = res.data.dateTimeIn;
        //   this.dataToday.dateTimeOut = res.data.dateTimeOut;
        //   // this.loader.present();
        //   // let dd = new Date(res.data.dateTimeIn);
        //   // let dateLastStamp = dd.getDate();
        //   // let dd2 = new Date(this.dateTimeNow);
        //   // let Today = dd2.getDate();
        //   // if (dateLastStamp != Today) {
        //   //   this.dataToday.dateTimeIn = null;
        //   //   this.dataToday.dateTimeOut = null;
        //   // }
        //   // alert('date from stmp : ' + dateLastStamp + ', DateToday : ' + Today);
        //   // alert(JSON.stringify(res.data.dateTimeIn) + " : " + JSON.stringify(res.data.dateTimeOut));
        //   // alert(JSON.stringify(this.dataToday.dateTimeIn) + " : " + JSON.stringify(this.dataToday.dateTimeOut));
        //   // this.loader.dismiss();
        // }).catch((err) => {
        //   this.dataToday.dateTimeIn = null;
        //   this.dataToday.dateTimeOut = null;
        //   // this.loader.dismiss();
        // });
    };
    ;
    HomePage.prototype.showMenu = function () {
        this.menu.open();
    };
    ;
    HomePage.prototype.stampFn = function () {
        var _this = this;
        this.stmp.chkstamp(this.userdetail._id).then(function (res) {
            if (res.status === '' || res.status === 'Not checkin') {
                _this.stampdata.dateTimeIn = new Date();
                _this.stampdata.locationIn.lat = _this.getlocation.lat;
                _this.stampdata.locationIn.lng = _this.getlocation.lng;
                _this.stmp.stampIn(_this.stampdata).then(function (data) {
                    _this.loader.dismiss();
                    _this.nativeStorage.setItem('StampToday', data).then(function () { return _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__stamp_detail_stamp_detail__["a" /* StampDetail */]); }, 
                    // alert('Stamptoday Data : ' + JSON.stringify(data)); 
                    function (error) { return alert('Error cannot setitem stamptoday! : ' + JSON.stringify(error)); });
                }).catch(function (err) {
                    _this.loader.dismiss();
                    var testErr = JSON.parse(err._body);
                    alert('Check in error! : ' + testErr.message);
                });
            }
            else if (res.status === 'checkin only') {
                _this.stampdata = res.data;
                _this.stampdata.dateTimeOut = new Date();
                _this.stampdata.locationOut.lat = _this.getlocation.lat;
                _this.stampdata.locationOut.lng = _this.getlocation.lng;
                _this.stmp.stampOut(_this.stampdata).then(function (data) {
                    _this.loader.dismiss();
                    _this.nativeStorage.setItem('StampToday', data).then(function () { return _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__stamp_detail_stamp_detail__["a" /* StampDetail */]); }, function (error) { return alert('Error! SetItem when stampOut'); });
                }).catch(function (err) {
                    _this.loader.dismiss();
                    var testErr = JSON.parse(err._body);
                    alert('Check Out call service Error in stmp : ' + testErr.message);
                });
            }
            else {
                _this.loader.dismiss();
                _this.nativeStorage.setItem('StampToday', res.data).then(function () { return _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__stamp_detail_stamp_detail__["a" /* StampDetail */]); }, function (error) { return alert('Error StampToday'); });
            }
        }).catch(function (err) {
            _this.loader.dismiss();
            var testErr = JSON.parse(err._body);
            alert("ERROR check Stamp : " + testErr.message);
        });
    };
    ;
    HomePage.prototype.openPage_stampDetail = function () {
        var _this = this;
        this.loader.present();
        this.vibration.vibrate(200);
        var GeolocationOptions = { timeout: 5000 };
        this.geolocation.getCurrentPosition(GeolocationOptions).then(function (resp) {
            _this.getlocation.lat = resp.coords.latitude;
            _this.getlocation.lng = resp.coords.longitude;
            // alert('LC : ' + JSON.stringify(resp.coords.latitude) + " : " + JSON.stringify(resp.coords.longitude));
            if (resp.coords.latitude && resp.coords.longitude) {
                _this.stampFn();
            }
        }).catch(function (error) {
            _this.loader.dismiss();
            alert("Cannot stamp!! \nPlease turn on GPS or Location service");
            // let testErr = JSON.parse(error._body);
            // alert('Error getting location : ' + testErr.message);
        });
    };
    ;
    HomePage.prototype.openPage_login = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* Login */]);
    };
    ;
    HomePage.prototype.openPage_regis = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__register_register__["a" /* Register */]);
    };
    ;
    HomePage.prototype.openPage_leave = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_5__leave_leave__["a" /* Leave */]);
    };
    ;
    HomePage.prototype.openPage_profile = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_6__profile_profile__["a" /* Profile */]);
    };
    ;
    HomePage.prototype.logout = function () {
        var _this = this;
        this.nativeStorage.clear();
        this.app.getRootNav().popToRoot();
        setTimeout(function () {
            _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* Login */]);
        }, 100);
    };
    ;
    HomePage.prototype.doClick = function () {
        this.menu.open();
    };
    ;
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], HomePage.prototype, "content", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/cybermacpro15/Desktop/TimeAttendant/timeattendant/src/pages/home/home.html"*/'<ion-header>\n    <ion-navbar>\n        <!--<ion-toolbar>-->\n        <ion-title titleNew>Time Attendance</ion-title>\n        <ion-buttons start>\n            <button ion-button icon-only color="royal" menuToggle><ion-icon name="menu"></ion-icon>\n            </button>\n        </ion-buttons>\n        <ion-buttons end>\n            <button ion-button clear style="width:44px;" no-padding>\n            </button>\n        </ion-buttons>\n        <!--</ion-toolbar>-->\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-grid>\n        <ion-row text-center>\n            <ion-col ion-text color="danger" tsize>\n                {{dateTimeNow | date: "shortTime"}}\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col text-center>\n                <ion-note>{{dateTimeNow | date: "dd MMM yyyy"}}</ion-note>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col text-center>\n                <img (press)="openPage_stampDetail()" src="img/fingerprint.png" fgprintImg>\n            </ion-col>\n        </ion-row>\n        <ion-row padding-top>\n            <ion-col col-12 text-center [hidden]="!dataToday.dateTimeIn">\n                <span ng-if="dataToday.dateTimeIn"><ion-icon name="md-arrow-dropright-circle" iconinList1></ion-icon>{{dataToday.dateTimeIn | date: "shortTime"}}</span>\n                <span ng-if="dataToday.dateTimeOut"><ion-icon name="md-arrow-dropleft-circle" iconinList2 ng-if="dataToday.dateTimeOut"></ion-icon>{{dataToday.dateTimeOut | date: "shortTime"}}</span>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>\n\n<ion-menu [content]="content">\n    <ion-header>\n        <ion-toolbar>\n            <ion-title>Menu</ion-title>\n        </ion-toolbar>\n    </ion-header>\n    <ion-content>\n        <ion-list>\n            <button ion-item (click)="openPage_leave()">\n                <ion-icon name="ios-alarm" padding-right menuIcon></ion-icon>\n          Leave\n        </button>\n\n            <button ion-item (click)="openPage_profile()">\n                <ion-icon name="md-person" padding-right menuIcon></ion-icon>\n          Profile\n        </button>\n            <button ion-item (click)="logout()">\n                <ion-icon name="md-log-out" padding-right menuIcon></ion-icon>\n          Log Out\n        </button>\n        </ion-list>\n    </ion-content>\n</ion-menu>'/*ion-inline-end:"/Users/cybermacpro15/Desktop/TimeAttendant/timeattendant/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_vibration__["a" /* Vibration */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_11__service_StampService__["a" /* StampService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_device__["a" /* Device */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_module__ = __webpack_require__(383);


Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_15" /* enableProdMode */])();

Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StampService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StampService = /** @class */ (function () {
    function StampService(http) {
        this.http = http;
        this.apiUrl = 'https://time-attendance.herokuapp.com/';
        // apiUrl: string = 'https://time-attendance-test.herokuapp.com/';
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/json'
        });
        this.optionsURL = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: this.headers
        });
    }
    StampService.prototype.stampIn = function (stampdata) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + 'api/checkins', stampdata, _this.optionsURL).map(function (res) {
                return res.json();
            }).subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    ;
    StampService.prototype.stampOut = function (stampdata) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.put(_this.apiUrl + 'api/checkins/' + stampdata._id, stampdata, _this.optionsURL).map(function (res) {
                return res.json();
            }).subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    ;
    StampService.prototype.chkstamp = function (userid) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.apiUrl + 'api/checkins/userid/' + userid).map(function (res) {
                return res.json();
            }).subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    ;
    StampService.prototype.createLeave = function (stampdata) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + 'api/leaves', stampdata, _this.optionsURL).map(function (res) {
                return res.json();
            }).subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    ;
    StampService.prototype.editLeave = function (leaveEditData) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.put(_this.apiUrl + 'api/leaves/' + leaveEditData._id, leaveEditData, _this.optionsURL).map(function (res) {
                return res.json();
            }).subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    ;
    StampService.prototype.getLeaveList = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.apiUrl + 'api/leaves/userid/' + user._id, _this.optionsURL).map(function (res) {
                return res.json();
            }).subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    ;
    StampService.prototype.getworkStampList = function (yearmth, user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.apiUrl + 'api/checkins/yearmonth&userid/' + yearmth + '/' + user._id, _this.optionsURL).map(function (res) {
                return res.json();
            }).subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    ;
    StampService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], StampService);
    return StampService;
}());

//# sourceMappingURL=StampService.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_datepicker_ionic2__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_stamp_detail_stamp_detail__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_register_register__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_leave_leave__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_leavelist_leavelist__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_profile_profile__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_history_history__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_request_request__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_leave_detail_leave_detail__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_splash_screen__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__angular_http__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_vibration__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_device__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_http__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_native_storage__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_geolocation__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_network__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_unique_device_id__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_date_picker__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__service_AuthenService__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__service_StampService__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* Login */],
                __WEBPACK_IMPORTED_MODULE_8__pages_stamp_detail_stamp_detail__["a" /* StampDetail */],
                __WEBPACK_IMPORTED_MODULE_9__pages_register_register__["a" /* Register */],
                __WEBPACK_IMPORTED_MODULE_10__pages_leave_leave__["a" /* Leave */],
                __WEBPACK_IMPORTED_MODULE_11__pages_leavelist_leavelist__["a" /* Leavelist */],
                __WEBPACK_IMPORTED_MODULE_12__pages_profile_profile__["a" /* Profile */],
                __WEBPACK_IMPORTED_MODULE_13__pages_history_history__["a" /* History */],
                __WEBPACK_IMPORTED_MODULE_14__pages_request_request__["a" /* Request */],
                __WEBPACK_IMPORTED_MODULE_15__pages_leave_detail_leave_detail__["a" /* LeaveDetailPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_18__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/history/history.module#HistoryModule', name: 'History', segment: 'history', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/leave/leave.module#LeaveModule', name: 'Leave', segment: 'leave', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/leave-detail/leave-detail.module#LeaveDetailPageModule', name: 'LeaveDetailPage', segment: 'leave-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/leavelist/leavelist.module#LeavelistModule', name: 'Leavelist', segment: 'leavelist', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginModule', name: 'Login', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/profile/profile.module#ProfileModule', name: 'Profile', segment: 'profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterModule', name: 'Register', segment: 'register', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/request/request.module#RequestModule', name: 'Request', segment: 'request', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/stamp-detail/stamp-detail.module#StampDetailModule', name: 'StampDetail', segment: 'stamp-detail', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_4_datepicker_ionic2__["a" /* DatePickerModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* Login */],
                __WEBPACK_IMPORTED_MODULE_8__pages_stamp_detail_stamp_detail__["a" /* StampDetail */],
                __WEBPACK_IMPORTED_MODULE_9__pages_register_register__["a" /* Register */],
                __WEBPACK_IMPORTED_MODULE_10__pages_leave_leave__["a" /* Leave */],
                __WEBPACK_IMPORTED_MODULE_11__pages_leavelist_leavelist__["a" /* Leavelist */],
                __WEBPACK_IMPORTED_MODULE_12__pages_profile_profile__["a" /* Profile */],
                __WEBPACK_IMPORTED_MODULE_13__pages_history_history__["a" /* History */],
                __WEBPACK_IMPORTED_MODULE_14__pages_request_request__["a" /* Request */],
                __WEBPACK_IMPORTED_MODULE_15__pages_leave_detail_leave_detail__["a" /* LeaveDetailPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_vibration__["a" /* Vibration */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_device__["a" /* Device */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_http__["a" /* HTTP */],
                __WEBPACK_IMPORTED_MODULE_27__service_AuthenService__["a" /* AuthenService */],
                __WEBPACK_IMPORTED_MODULE_28__service_StampService__["a" /* StampService */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_native_storage__["a" /* NativeStorage */],
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_unique_device_id__["a" /* UniqueDeviceID */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_date_picker__["a" /* DatePicker */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 436:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 186,
	"./af.js": 186,
	"./ar": 187,
	"./ar-dz": 188,
	"./ar-dz.js": 188,
	"./ar-kw": 189,
	"./ar-kw.js": 189,
	"./ar-ly": 190,
	"./ar-ly.js": 190,
	"./ar-ma": 191,
	"./ar-ma.js": 191,
	"./ar-sa": 192,
	"./ar-sa.js": 192,
	"./ar-tn": 193,
	"./ar-tn.js": 193,
	"./ar.js": 187,
	"./az": 194,
	"./az.js": 194,
	"./be": 195,
	"./be.js": 195,
	"./bg": 196,
	"./bg.js": 196,
	"./bm": 197,
	"./bm.js": 197,
	"./bn": 198,
	"./bn.js": 198,
	"./bo": 199,
	"./bo.js": 199,
	"./br": 200,
	"./br.js": 200,
	"./bs": 201,
	"./bs.js": 201,
	"./ca": 202,
	"./ca.js": 202,
	"./cs": 203,
	"./cs.js": 203,
	"./cv": 204,
	"./cv.js": 204,
	"./cy": 205,
	"./cy.js": 205,
	"./da": 206,
	"./da.js": 206,
	"./de": 207,
	"./de-at": 208,
	"./de-at.js": 208,
	"./de-ch": 209,
	"./de-ch.js": 209,
	"./de.js": 207,
	"./dv": 210,
	"./dv.js": 210,
	"./el": 211,
	"./el.js": 211,
	"./en-au": 212,
	"./en-au.js": 212,
	"./en-ca": 213,
	"./en-ca.js": 213,
	"./en-gb": 214,
	"./en-gb.js": 214,
	"./en-ie": 215,
	"./en-ie.js": 215,
	"./en-il": 216,
	"./en-il.js": 216,
	"./en-nz": 217,
	"./en-nz.js": 217,
	"./eo": 218,
	"./eo.js": 218,
	"./es": 219,
	"./es-do": 220,
	"./es-do.js": 220,
	"./es-us": 221,
	"./es-us.js": 221,
	"./es.js": 219,
	"./et": 222,
	"./et.js": 222,
	"./eu": 223,
	"./eu.js": 223,
	"./fa": 224,
	"./fa.js": 224,
	"./fi": 225,
	"./fi.js": 225,
	"./fo": 226,
	"./fo.js": 226,
	"./fr": 227,
	"./fr-ca": 228,
	"./fr-ca.js": 228,
	"./fr-ch": 229,
	"./fr-ch.js": 229,
	"./fr.js": 227,
	"./fy": 230,
	"./fy.js": 230,
	"./gd": 231,
	"./gd.js": 231,
	"./gl": 232,
	"./gl.js": 232,
	"./gom-latn": 233,
	"./gom-latn.js": 233,
	"./gu": 234,
	"./gu.js": 234,
	"./he": 235,
	"./he.js": 235,
	"./hi": 236,
	"./hi.js": 236,
	"./hr": 237,
	"./hr.js": 237,
	"./hu": 238,
	"./hu.js": 238,
	"./hy-am": 239,
	"./hy-am.js": 239,
	"./id": 240,
	"./id.js": 240,
	"./is": 241,
	"./is.js": 241,
	"./it": 242,
	"./it.js": 242,
	"./ja": 243,
	"./ja.js": 243,
	"./jv": 244,
	"./jv.js": 244,
	"./ka": 245,
	"./ka.js": 245,
	"./kk": 246,
	"./kk.js": 246,
	"./km": 247,
	"./km.js": 247,
	"./kn": 248,
	"./kn.js": 248,
	"./ko": 249,
	"./ko.js": 249,
	"./ky": 250,
	"./ky.js": 250,
	"./lb": 251,
	"./lb.js": 251,
	"./lo": 252,
	"./lo.js": 252,
	"./lt": 253,
	"./lt.js": 253,
	"./lv": 254,
	"./lv.js": 254,
	"./me": 255,
	"./me.js": 255,
	"./mi": 256,
	"./mi.js": 256,
	"./mk": 257,
	"./mk.js": 257,
	"./ml": 258,
	"./ml.js": 258,
	"./mn": 259,
	"./mn.js": 259,
	"./mr": 260,
	"./mr.js": 260,
	"./ms": 261,
	"./ms-my": 262,
	"./ms-my.js": 262,
	"./ms.js": 261,
	"./mt": 263,
	"./mt.js": 263,
	"./my": 264,
	"./my.js": 264,
	"./nb": 265,
	"./nb.js": 265,
	"./ne": 266,
	"./ne.js": 266,
	"./nl": 267,
	"./nl-be": 268,
	"./nl-be.js": 268,
	"./nl.js": 267,
	"./nn": 269,
	"./nn.js": 269,
	"./pa-in": 270,
	"./pa-in.js": 270,
	"./pl": 271,
	"./pl.js": 271,
	"./pt": 272,
	"./pt-br": 273,
	"./pt-br.js": 273,
	"./pt.js": 272,
	"./ro": 274,
	"./ro.js": 274,
	"./ru": 275,
	"./ru.js": 275,
	"./sd": 276,
	"./sd.js": 276,
	"./se": 277,
	"./se.js": 277,
	"./si": 278,
	"./si.js": 278,
	"./sk": 279,
	"./sk.js": 279,
	"./sl": 280,
	"./sl.js": 280,
	"./sq": 281,
	"./sq.js": 281,
	"./sr": 282,
	"./sr-cyrl": 283,
	"./sr-cyrl.js": 283,
	"./sr.js": 282,
	"./ss": 284,
	"./ss.js": 284,
	"./sv": 285,
	"./sv.js": 285,
	"./sw": 286,
	"./sw.js": 286,
	"./ta": 287,
	"./ta.js": 287,
	"./te": 288,
	"./te.js": 288,
	"./tet": 289,
	"./tet.js": 289,
	"./tg": 290,
	"./tg.js": 290,
	"./th": 291,
	"./th.js": 291,
	"./tl-ph": 292,
	"./tl-ph.js": 292,
	"./tlh": 293,
	"./tlh.js": 293,
	"./tr": 294,
	"./tr.js": 294,
	"./tzl": 295,
	"./tzl.js": 295,
	"./tzm": 296,
	"./tzm-latn": 297,
	"./tzm-latn.js": 297,
	"./tzm.js": 296,
	"./ug-cn": 298,
	"./ug-cn.js": 298,
	"./uk": 299,
	"./uk.js": 299,
	"./ur": 300,
	"./ur.js": 300,
	"./uz": 301,
	"./uz-latn": 302,
	"./uz-latn.js": 302,
	"./uz.js": 301,
	"./vi": 303,
	"./vi.js": 303,
	"./x-pseudo": 304,
	"./x-pseudo.js": 304,
	"./yo": 305,
	"./yo.js": 305,
	"./zh-cn": 306,
	"./zh-cn.js": 306,
	"./zh-hk": 307,
	"./zh-hk.js": 307,
	"./zh-tw": 308,
	"./zh-tw.js": 308
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 436;

/***/ }),

/***/ 480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_register_register__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_native_storage__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// import { LeaveDetailPage } from '../pages/leave-detail/leave-detail';

var MyApp = /** @class */ (function () {
    function MyApp(app, platform, statusBar, splashScreen, nativeStorage) {
        var _this = this;
        this.app = app;
        this.nativeStorage = nativeStorage;
        platform.ready().then(function () {
            statusBar.styleDefault();
            setTimeout(function () {
                splashScreen.hide();
            }, 100);
            _this.nativeStorage.getItem('TimeStampUser').then(function (res) { return _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */]; }, function (error) {
                return _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_register_register__["a" /* Register */];
            }
            //  this.rootPage = TabsPage
            // this.rootPage = LeaveDetailPage;
            );
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/cybermacpro15/Desktop/TimeAttendant/timeattendant/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/cybermacpro15/Desktop/TimeAttendant/timeattendant/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_native_storage__["a" /* NativeStorage */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthenService = /** @class */ (function () {
    function AuthenService(http) {
        this.http = http;
        this.apiUrl = 'https://time-attendance.herokuapp.com/';
        // apiUrl: string = 'https://time-attendance-test.herokuapp.com/';
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/json'
        });
        this.optionsURL = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
            headers: this.headers
        });
    }
    AuthenService.prototype.getEmpDataApi = function (email) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.apiUrl + 'api/Employeeprofile/email/' + email).map(function (res) {
                return res.json();
            }).subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    AuthenService.prototype.signUp = function (register) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + 'api/auth/signup', register, _this.optionsURL).map(function (res) {
                return res.json();
            }).subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    ;
    AuthenService.prototype.updateProfile = function (profile) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.put(_this.apiUrl + 'api/employeeprofiles/' + profile._id, profile, _this.optionsURL).map(function (res) {
                return res.json();
            }).subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    ;
    AuthenService.prototype.signIn = function (signin) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + 'api/auth/signin', signin, _this.optionsURL).map(function (res) {
                return res.json();
            }).subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    ;
    AuthenService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], AuthenService);
    return AuthenService;
}());

//# sourceMappingURL=AuthenService.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__history_history__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__request_request__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__ = __webpack_require__(315);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TabsPage = /** @class */ (function () {
    function TabsPage(network, toastCtrl) {
        var _this = this;
        this.network = network;
        this.toastCtrl = toastCtrl;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__history_history__["a" /* History */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__request_request__["a" /* Request */];
        this.network.onDisconnect().subscribe(function () {
            _this.toast = _this.toastCtrl.create({
                message: 'No Internet Connection!',
                // duration: 3000,
                position: 'top',
                cssClass: 'toastTextCenter'
            });
            _this.toast.present();
        });
        this.network.onConnect().subscribe(function () {
            _this.toast.dismiss();
        });
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/cybermacpro15/Desktop/TimeAttendant/timeattendant/src/pages/tabs/tabs.html"*/'<ion-tabs>\n    <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="md-swap"></ion-tab>\n    <ion-tab [root]="tab2Root" tabTitle="History" tabIcon="paper"></ion-tab>\n    <ion-tab [root]="tab3Root" tabTitle="Request" tabIcon="list-box"></ion-tab>\n    <!--<ion-tab [root]="tab3Root" tabTitle="Request" tabIcon="list-box"></ion-tab>-->\n</ion-tabs>'/*ion-inline-end:"/Users/cybermacpro15/Desktop/TimeAttendant/timeattendant/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* ToastController */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Register; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs_tabs__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_device__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__service_AuthenService__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_native_storage__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_unique_device_id__ = __webpack_require__(99);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



 //Headers






var Register = /** @class */ (function () {
    function Register(uniqueDeviceID, http, app, navCtrl, navParams, athService, device, nativeStorage, loadingCtrl) {
        var _this = this;
        this.uniqueDeviceID = uniqueDeviceID;
        this.http = http;
        this.app = app;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.athService = athService;
        this.device = device;
        this.nativeStorage = nativeStorage;
        this.loadingCtrl = loadingCtrl;
        this.loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        if (this.device.platform == "iOS") {
            this.uniqueDeviceID.get()
                .then(function (uuid) { return _this.deviceUUID = uuid; })
                .catch(function (error) { return alert("Error getting device information on iOS!\nPlease contact support team."); });
        }
        else if (this.device.platform == "Android") {
            this.deviceUUID = this.device.uuid;
        }
    }
    Register.prototype.gotoLogin = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* Login */]);
    };
    Register.prototype.register = function (email) {
        var _this = this;
        this.loader.present();
        if (email) {
            this.athService.getEmpDataApi(email).then(function (data) {
                if (data.employees.length > 0) {
                    var register = {
                        firstName: email.split('@')[0],
                        lastName: '@' + email.split('@')[1],
                        email: email,
                        username: email.split('@')[0],
                        password: _this.deviceUUID.substr(0, 10) + '#Pass',
                        deviceID: _this.deviceUUID,
                        employeeprofile: data.employees[0]
                    };
                    _this.athService.signUp(register).then(function (data) {
                        _this.nativeStorage.setItem('TimeStampUser', data).then(function () { }, function (error) { return alert("Cannot storing User data"); });
                        _this.loader.dismiss();
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */]);
                    }, function (err) {
                        var testErr = JSON.parse(err._body);
                        _this.loader.dismiss();
                        alert(testErr.message);
                    });
                }
                else {
                    _this.loader.dismiss();
                    alert("This Email is not Employee!!");
                }
            }, function (err) {
                var testErr = JSON.parse(err._body);
                _this.loader.dismiss();
                alert(testErr.message);
            });
        }
        else {
            this.loader.dismiss();
            alert('Please fill your email.');
        }
    };
    Register = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"/Users/cybermacpro15/Desktop/TimeAttendant/timeattendant/src/pages/register/register.html"*/'<ion-content padding>\n    <ion-grid>\n\n        <ion-row>\n            <ion-col text-center>\n                <img src="img/regpic.png" width="60%">\n            </ion-col>\n        </ion-row>\n\n        <ion-row>\n            <ion-col ion-text >\n                <ion-icon name="md-person-add" iconSize></ion-icon>\n                <span style="font-size:25px" colorSet>Register</span>\n            </ion-col>\n        </ion-row>\n\n        <ion-row>\n            <ion-col>\n                <ion-list style="margin-top: 10px">\n                    <ion-item>\n                        <ion-label> <ion-icon name="mail" emailIcon></ion-icon></ion-label>\n                        <ion-input type="email" placeholder="E-mail" item-center [(ngModel)]="email"></ion-input>\n                    </ion-item>\n                </ion-list>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col text-center>\n                <button ion-button color="danger" (click)="register(email)" buttonSize>Submit</button>\n            </ion-col>\n            <ion-col text-center>\n                <button ion-button color="danger" (click)="gotoLogin()" buttonSize>Back to Login</button>\n            </ion-col>\n        </ion-row>\n\n    </ion-grid>\n</ion-content>'/*ion-inline-end:"/Users/cybermacpro15/Desktop/TimeAttendant/timeattendant/src/pages/register/register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_9__ionic_native_unique_device_id__["a" /* UniqueDeviceID */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_7__service_AuthenService__["a" /* AuthenService */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], Register);
    return Register;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaveDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_StampService__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_AuthenService__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LeaveDetailPage = /** @class */ (function () {
    function LeaveDetailPage(nativeStorage, navCtrl, navParams, stampService, athService) {
        var _this = this;
        this.nativeStorage = nativeStorage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.stampService = stampService;
        this.athService = athService;
        this.leaveDetail = this.navParams.get('leaveDetail');
        this.nativeStorage.getItem('TimeStampUser').then(function (data) { return _this.getEmployeeData(data.email); }, function (error) { return alert(error); });
        this.ionViewDidLoad();
        // this.nativeStorage.getItem('TimeStampUser').then(
        //   data => {
        //     this.userDetail = data;
        //   },
        //   error => { alert(error); }
        // );
        // this.leaveDetail.leaveStartDateTime = this.stampService.convertDateTimeThaiFormat(this.leaveDetail.leaveStartDateTime);
        // this.leaveDetail.leaveEndDateTime = this.stampService.convertDateTimeThaiFormat(this.leaveDetail.leaveEndDateTime);
        // alert("LEAVEDETAIL : " + JSON.stringify(this.leaveDetail));
    }
    LeaveDetailPage.prototype.ionViewDidLoad = function () {
        // if (this.leaveDetail.leaveType == "Personal Leave") {
        //   this.leaveDetail.leaveType = "ลากิจ";
        // } else if (this.leaveDetail.leaveType == "Sick Leave") {
        //   this.leaveDetail.leaveType = "ลาป่วย";
        // } else if (this.leaveDetail.leaveType == "Vacation") {
        //   this.leaveDetail.leaveType = "ลาพักร้อน";
        // } else if (this.leaveDetail.leaveType == "Militiary Service Leave") {
        //   this.leaveDetail.leaveType = "ลาเกณฑ์ทหาร";
        // } else if (this.leaveDetail.leaveType == "Maternity Leave") {
        //   this.leaveDetail.leaveType = "ลาคลอดบุตร";
        // } else if (this.leaveDetail.leaveType == "Ordination Leave") {
        //   this.leaveDetail.leaveType = "ลาบวช";
        // }
    };
    LeaveDetailPage.prototype.getEmployeeData = function (email) {
        var _this = this;
        this.athService.getEmpDataApi(email).then(function (emp) {
            // alert(JSON.stringify(emp.employees[0]));
            _this.userDetail = emp.employees[0];
            if (_this.leaveDetail.leaveTime < 2) {
                _this.hr = "Hour";
            }
            else {
                _this.hr = "Hours";
            }
            // alert("USERDETAIL : " +JSON.stringify(this.userDetail));
        }, function (err) {
            var testErr = JSON.parse(err._body);
            alert(testErr.message);
        });
    };
    LeaveDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-leave-detail',template:/*ion-inline-start:"/Users/cybermacpro15/Desktop/TimeAttendant/timeattendant/src/pages/leave-detail/leave-detail.html"*/'<ion-header>\n\n    <ion-navbar>\n        <ion-title>Leave Detail</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    <ion-list>\n        <ion-item>\n            <ion-label class="fontbold" style="color:black;">Leave Type : </ion-label>\n            <ion-input type="text" value="{{leaveDetail.leaveType}}" text-right margin-right disabled="true"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label class="fontbold" style="color:black;">Leave Detail : </ion-label>\n            <ion-input type="text" value="{{leaveDetail.leaveDetail}}" text-right margin-right disabled="true"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label class="fontbold" style="color:black;">From :</ion-label>\n            <ion-input type="text" text-right margin-right value="{{leaveDetail.leaveStartDateTime | date: \'dd MMM yyyy\'}}" disabled="true"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label class="fontbold" style="color:black;">To :</ion-label>\n            <ion-input type="text" text-right margin-right value="{{leaveDetail.leaveEndDateTime | date: \'dd MMM yyyy\'}}" disabled="true"></ion-input>\n        </ion-item>\n        <ion-item [hidden]="!leaveDetail.leaveHalf">\n            <ion-label class="fontbold" style="color:black;">Leave half-day :</ion-label>\n            <ion-input type="text" text-right value="{{leaveDetail.leaveTime}} {{hr}}" margin-right disabled="true"></ion-input>\n        </ion-item>\n        <ion-item [hidden]="leaveDetail.leaveHalf">\n            <ion-label class="fontbold" style="color:black;">Total leave : </ion-label>\n            <ion-input type="text" text-right value="{{leaveDetail.leaveDay}} Days" margin-right disabled="true"></ion-input>\n        </ion-item>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/cybermacpro15/Desktop/TimeAttendant/timeattendant/src/pages/leave-detail/leave-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__service_StampService__["a" /* StampService */], __WEBPACK_IMPORTED_MODULE_4__service_AuthenService__["a" /* AuthenService */]])
    ], LeaveDetailPage);
    return LeaveDetailPage;
}());

//# sourceMappingURL=leave-detail.js.map

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Leave; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__leavelist_leavelist__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_StampService__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_date_picker__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tabs_tabs__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { HomePage } from '../home/home';





var Leave = /** @class */ (function () {
    function Leave(datePicker, app, modal, navCtrl, navParams, stmp, nativeStorage, loadingCtrl, menu) {
        var _this = this;
        this.datePicker = datePicker;
        this.app = app;
        this.modal = modal;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.stmp = stmp;
        this.nativeStorage = nativeStorage;
        this.loadingCtrl = loadingCtrl;
        this.menu = menu;
        this.leaveData = {};
        this.nativeStorage.getItem('TimeStampUser').then(function (data) {
            _this.userdetail = data;
            _this.leaveData.email = _this.userdetail.email;
        }, function (error) { return alert(error); });
        if (this.navParams.get('leaveData')) {
            this.leaveData = this.navParams.get('leaveData');
            this.localStartDate = this.leaveData.leaveStartDateTime;
            this.localEndDate = this.leaveData.leaveEndDateTime;
        }
    }
    Leave.prototype.openModalpage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__leavelist_leavelist__["a" /* Leavelist */]);
    };
    Leave.prototype.openHomepage = function () {
        this.menu.close();
        this.navCtrl.pop();
    };
    Leave.prototype.getDateFrom = function () {
        var _this = this;
        this.datePicker.show({
            date: new Date(),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
        }).then(function (date) {
            // this.localStartDate = date;
            _this.localStartDate = date;
            // let txtDate = new Date(date);
            // this.localStartDate = txtDate.getDate();
            if (_this.localStartDate && _this.localEndDate) {
                _this.checkDate(_this.localStartDate, _this.localEndDate);
            }
        }, function (err) { });
    };
    Leave.prototype.getDateTo = function () {
        var _this = this;
        this.datePicker.show({
            date: new Date(),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
        }).then(function (date) {
            // this.localStartDate = date;
            // let txtDate = new Date(date);
            _this.localEndDate = date;
            // this.localEndDate = txtDate.getDate();
            if (_this.localStartDate && _this.localEndDate) {
                _this.checkDate(_this.localStartDate, _this.localEndDate);
            }
        }, function (err) { });
    };
    Leave.prototype.checkDate = function (date1, date2) {
        //  var Date1 = date1;
        // var Date2 = date2;
        // var Date1 = Date.parse(date1);
        // var Date2 = Date.parse(date2);
        // if (Date1 > Date2) {
        if (date1 > date2) {
            alert("From date must be less than To date");
            this.localStartDate = '';
            this.localEndDate = '';
            this.leaveData.leaveStartDateTime = '';
            this.leaveData.leaveEndDateTime = '';
        }
        else {
            this.leaveData.leaveStartDateTime = this.localStartDate;
            this.leaveData.leaveEndDateTime = this.localEndDate;
        }
    };
    Leave.prototype.sendLeave = function (intype) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        this.leaveData.leaveDay = this.dateDif(this.leaveData.leaveStartDateTime, this.leaveData.leaveEndDateTime);
        if (!this.leaveData.leaveType) {
            loader.dismiss();
            alert("Please select Leave Type.");
        }
        else if (!this.leaveData.leaveStartDateTime && !this.leaveData.leaveEndDateTime) {
            loader.dismiss();
            alert("Please select Start Date and End Date.");
        }
        else if (!this.leaveData.leaveStartDateTime || !this.leaveData.leaveStartDateTime) {
            loader.dismiss();
            alert("Please select Start Date or End Date.");
        }
        else if (!this.leaveData.leaveDetail) {
            loader.dismiss();
            alert("Please complete the leave details.");
        }
        else if (this.leaveData.leaveType && this.leaveData.leaveStartDateTime && this.leaveData.leaveEndDateTime && this.leaveData.leaveDetail) {
            if (!this.leaveData._id) {
                this.leaveData.approveStatus = "Waiting";
                this.leaveData.leaveStatus = intype;
                this.stmp.createLeave(this.leaveData).then(function (resp) {
                    if (intype == 'Draft') {
                        alert("Save draft complete.");
                        loader.dismiss();
                        _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_2__leavelist_leavelist__["a" /* Leavelist */]);
                    }
                    else if (intype == 'Request') {
                        alert("Send leave complete.");
                        loader.dismiss();
                        _this.menu.close();
                        _this.navCtrl.pop();
                    }
                }).catch(function (err) {
                    loader.dismiss();
                    var testErr = JSON.parse(err._body);
                    alert("Error on Create Leave service : " + testErr.message);
                });
            }
            else if (this.leaveData._id) {
                this.leaveData.leaveStatus = intype;
                this.leaveData.approveStatus = "Waiting";
                this.stmp.editLeave(this.leaveData).then(function (resp) {
                    if (intype == 'Draft') {
                        alert("Save draft complete.");
                        loader.dismiss();
                        _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_2__leavelist_leavelist__["a" /* Leavelist */]);
                    }
                    else if (intype == 'Request') {
                        alert("Send leave complete.");
                        loader.dismiss();
                        _this.menu.close();
                        setTimeout(function () {
                            _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_6__tabs_tabs__["a" /* TabsPage */]);
                        }, 100);
                    }
                }).catch(function (err) {
                    loader.dismiss();
                    var testErr = JSON.parse(err._body);
                    alert("Error on Edit Leave service : " + testErr.message);
                });
            }
        }
        else {
            loader.dismiss();
        }
    };
    Leave.prototype.dateDif = function (strDate1, strDate2) {
        var theDate1 = Date.parse(strDate1) / 1000;
        var theDate2 = Date.parse(strDate2) / 1000;
        var diff = (theDate2 - theDate1) / (60 * 60 * 24);
        return Math.floor(diff) + 1;
    };
    Leave.prototype.logEvent = function () {
        if (this.leaveData.leaveHalf == false) {
            this.leaveData.leaveTime = "";
        }
        else if (this.leaveData.leaveHalf == true) {
            this.leaveData.leaveEndDateTime = this.leaveData.leaveStartDateTime;
            this.localEndDate = this.leaveData.leaveEndDateTime;
        }
    };
    Leave = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-leave',template:/*ion-inline-start:"/Users/cybermacpro15/Desktop/TimeAttendant/timeattendant/src/pages/leave/leave.html"*/'<!--\n\n  Generated template for the Leave page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n\n\n<ion-header>\n\n    <ion-toolbar>\n\n        <ion-buttons start>\n\n            <button ion-button icon-only color="royal" (click)="openHomepage()">\n\n        <ion-icon name="home"></ion-icon>\n\n      </button>\n\n        </ion-buttons>\n\n        <ion-title>Leave</ion-title>\n\n        <ion-buttons end>\n\n            <button ion-button icon-only color="royal" (click)="openModalpage()">\n\n        <ion-icon name="ios-list"></ion-icon>\n\n      </button>\n\n        </ion-buttons>\n\n    </ion-toolbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content leaveContent>\n\n    <ion-list>\n\n        <ion-item>\n\n            <ion-label class="fontbold" style="color:black;">Leave Type<span dokchan>*</span> :</ion-label>\n\n            <ion-select [(ngModel)]="leaveData.leaveType" interface="popover">\n\n                <ion-option value="Sick Leave">Sick Leave</ion-option>\n\n                <ion-option value="Personal Leave">Personal Leave</ion-option>\n\n                <ion-option value="Vacation">Vacation</ion-option>\n\n                <ion-option value="Militiary Service Leave">Militiary Service Leave</ion-option>\n\n                <ion-option value="Maternity Leave">Maternity Leave</ion-option>\n\n                <ion-option value="Ordination Leave">Ordination Leave</ion-option>\n\n            </ion-select>\n\n        </ion-item>\n\n        <ion-item>\n\n            <ion-label class="fontbold" style="color:black;">Leave Detail<span dokchan>*</span> :</ion-label>\n\n            <ion-input #myInput id="Remark" type="text" placeholder="Fill your leave cause..." [(ngModel)]="leaveData.leaveDetail"></ion-input>\n\n            <!--<p class="fontbold">Leave Detail<span dokchan>*</span> :</p>-->\n\n        </ion-item>\n\n        <ion-item>\n\n            <ion-label class="fontbold" style="color:black;">From<span dokchan>*</span> :</ion-label>\n\n            <ion-input style="color:black;" type="text" value="{{localStartDate | date}}" readonly="true" text-right padding-right (click)="getDateFrom()"></ion-input>\n\n            <button ion-button clear color="dark" type="button" item-right btnCalendar>\n\n        <span><ion-icon name="calendar" iconCalender (click)="getDateFrom()"></ion-icon></span></button>\n\n\n\n        </ion-item>\n\n        <ion-item>\n\n            <ion-label class="fontbold" style="color:black;">To<span dokchan>*</span> :</ion-label>\n\n            <ion-input style="color:black;" type="text" value="{{localEndDate | date}}" readonly="true" text-right padding-right (click)="getDateTo()"></ion-input>\n\n            <button ion-button clear color="dark" type="button" item-right btnCalendar>\n\n        <span><ion-icon name="calendar" iconCalender (click)="getDateTo()"></ion-icon></span></button>\n\n        </ion-item>\n\n        <!--<ion-item>\n\n           \n\n            <ion-label class="fontbold" style="color:black;">To<span dokchan>*</span> :</ion-label>\n\n            <ion-input style="color:black;" [(ngModel)]="localStartDate" (click)="getDateFrom()"></ion-input>\n\n\n\n        </ion-item>-->\n\n\n\n\n\n\n\n        <ion-item>\n\n            <ion-label class="fontbold" style="color:black;">Half-Day</ion-label>\n\n            <ion-toggle enable checked="false" color="dog" [(ngModel)]="leaveData.leaveHalf" (ionChange)="logEvent()"></ion-toggle>\n\n        </ion-item>\n\n        <ion-item [hidden]="!leaveData.leaveHalf">\n\n            <ion-label class="fontbold" style="color:black;">Leave time : </ion-label>\n\n            <ion-input oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"\n\n                type="number" maxlength="2" text-center [(ngModel)]="leaveData.leaveTime"></ion-input>\n\n        </ion-item>\n\n        <ion-grid gridA>\n\n            <ion-row>\n\n                <ion-col col-4 text-center>\n\n                    <button ion-button saveBtnColor (click)="sendLeave(\'Draft\')">Draft</button>\n\n                </ion-col>\n\n                <ion-col col-4 text-center>\n\n                    <button ion-button color="royal" (click)="sendLeave(\'Request\')">Send</button>\n\n                </ion-col>\n\n                <ion-col col-4 text-center>\n\n                    <button ion-button cancelBtnColor (click)="openHomepage()">Cancel</button>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-grid>\n\n    </ion-list>\n\n\n\n</ion-content>'/*ion-inline-end:"/Users/cybermacpro15/Desktop/TimeAttendant/timeattendant/src/pages/leave/leave.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ionic_native_date_picker__["a" /* DatePicker */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__service_StampService__["a" /* StampService */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */]])
    ], Leave);
    return Leave;
}());

//# sourceMappingURL=leave.js.map

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Login; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs_tabs__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__register_register__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_AuthenService__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_native_storage__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_unique_device_id__ = __webpack_require__(99);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var Login = /** @class */ (function () {
    function Login(uniqueDeviceID, app, navCtrl, navParams, device, auth, nativeStorage, loadingCtrl) {
        var _this = this;
        this.uniqueDeviceID = uniqueDeviceID;
        this.app = app;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.device = device;
        this.auth = auth;
        this.nativeStorage = nativeStorage;
        this.loadingCtrl = loadingCtrl;
        if (this.device.platform == "iOS") {
            this.uniqueDeviceID.get()
                .then(function (uuid) { return _this.deviceUUID = uuid; })
                .catch(function (error) { return alert("Error getting device information on iOS!\nPlease contact support team."); });
        }
        else if (this.device.platform == "Android") {
            this.deviceUUID = this.device.uuid;
            // alert(this.device.uuid);
        }
        // this.did = this.device.uuid;
        // this.did = '7ef823544ff64e4';
    }
    Login.prototype.openPage_home = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */]);
    };
    Login.prototype.Login = function (inemail) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        if (inemail) {
            var signin = {
                username: inemail.split('@')[0],
                password: this.deviceUUID.substr(0, 10) + '#Pass'
                // password: '7ef823544f#Pass'
            };
            this.auth.signIn(signin).then(function (dataresp) {
                _this.nativeStorage.setItem('TimeStampUser', dataresp).then(function (data) { }, function (error) { return alert("Cannot storing User data"); });
                loader.dismiss();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */]);
            }).catch(function (err) {
                loader.dismiss();
                var testErr = JSON.parse(err._body);
                alert('Sign in error!\n' + testErr.message);
            });
        }
    };
    Login.prototype.GotoReg = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_4__register_register__["a" /* Register */]);
    };
    Login = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/cybermacpro15/Desktop/TimeAttendant/timeattendant/src/pages/login/login.html"*/'<!--\n  Generated template for the Login page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content padding>\n    <ion-grid>\n\n        <ion-row>\n            <ion-col text-center>\n                <img src="img/regpic.png" width="60%">\n            </ion-col>\n        </ion-row>\n\n        <ion-row>\n            <ion-col ion-text style="font-size:25px">\n                 <ion-icon name="md-key" iconSize></ion-icon>\n                <span style="font-size:25px" colorSet>Login</span>\n            </ion-col>\n        </ion-row>\n\n        <ion-row>\n            <ion-col>\n                <ion-list style="margin-top: 10px">\n                    <ion-item>\n                        <ion-label> <ion-icon name="mail" emailIcon></ion-icon></ion-label>\n                        <ion-input type="email" placeholder="E-mail" item-center [(ngModel)]="inemail"></ion-input>\n                    </ion-item>\n                </ion-list>\n            </ion-col>\n        </ion-row>\n\n        <ion-row>\n            <ion-col text-center>\n                <button ion-button color="danger" (click)="Login(inemail)" buttonSize>Submit</button>\n            </ion-col>\n            <ion-col text-center>\n                <button ion-button color="danger" (click)="GotoReg()" buttonSize>Register</button>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>'/*ion-inline-end:"/Users/cybermacpro15/Desktop/TimeAttendant/timeattendant/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__ionic_native_unique_device_id__["a" /* UniqueDeviceID */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_5__service_AuthenService__["a" /* AuthenService */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], Login);
    return Login;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Profile; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_AuthenService__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Profile = /** @class */ (function () {
    // public empDetail = {
    //   user: {},
    //   office: {
    //     address: {}
    //   }
    // };
    function Profile(navCtrl, navParams, nativeStorage, athService, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nativeStorage = nativeStorage;
        this.athService = athService;
        this.loadingCtrl = loadingCtrl;
        this.empDetail = {};
        this.comp = {};
        this.compAddress = {};
        // this.getEmployeeData('nutprapobsun.mick@gmail.com');
        this.nativeStorage.getItem('TimeStampUser').then(function (data) { return _this.getEmployeeData(data.email); }, function (error) { return alert(error); });
    }
    Profile.prototype.getEmployeeData = function (email) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        this.athService.getEmpDataApi(email).then(function (emp) {
            // alert(JSON.stringify(emp.employees[0]));
            _this.empDetail = emp.employees[0];
            _this.comp = emp.employees[0].company;
            _this.compAddress = emp.employees[0].company.address;
            // this.empDetail = emp.employees;
            // this.comp = emp.employees.company;
            // this.compAddress = emp.employees.company.address;
            loader.dismiss();
        }).catch(function (err) {
            var testErr = JSON.parse(err._body);
            loader.dismiss();
            alert("Error on get employee data : " + testErr.message);
        });
    };
    Profile = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"/Users/cybermacpro15/Desktop/TimeAttendant/timeattendant/src/pages/profile/profile.html"*/'<ion-header>\n\n    <ion-navbar>\n        <ion-title>Profile</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only>\n        <!--<ion-icon name="md-share"></ion-icon>-->\n      </button>\n        </ion-buttons>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    <ion-grid>\n        <ion-row>\n            <ion-col col-12 text-center>\n                <ion-list>\n                    <ion-item>\n                        <ion-avatar item-left>\n                            <img src="{{empDetail.image}}">\n                        </ion-avatar>\n                        <h2 thaifont Headerfont text-wrap text-center>{{empDetail.firstname}} {{empDetail.lastname}}</h2>\n                        <p thaifont text-center>{{empDetail.jobTitle}}</p>\n                    </ion-item>\n                </ion-list>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col width-100 text-wrap>\n                <p thaifont>{{comp.name}}</p>\n                <p thaifont>{{compAddress.address}} {{compAddress.district}} {{compAddress.subdistrict}} {{compAddress.province}} {{compAddress.postcode}}\n                    <!--<p thaifont>{{empDetail.company.name}}</p>-->\n                    <!--<p thaifont>{{empDetail.company.address.address}} {{empDetail.company.address.district}} {{empDetail.company.address.subdistrict}} {{empDetail.company.address.province}} {{empDetail.company.address.country.th}} {{empDetail.company.address.postcode}}</p>-->\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n\n    <ion-grid>\n        <ion-row padding-left padding-bottom contentRow>\n            <img src="img/call.png" iconset>\n            <p contentIcon thaifont>{{empDetail.mobile}}</p>\n        </ion-row>\n        <ion-row padding-left padding-bottom contentRow>\n            <img src="img/facebook.png" iconset>\n            <p contentIcon thaifont>{{empDetail.facebook}}</p>\n        </ion-row>\n        <ion-row padding-left padding-bottom contentRow>\n            <img src="img/line.png" iconset>\n            <p contentIcon thaifont>{{empDetail.line}}</p>\n        </ion-row>\n        <ion-row padding-left padding-bottom contentRow>\n            <img src="img/email.png" iconset>\n            <p contentIcon thaifont>{{empDetail.email}}</p>\n        </ion-row>\n    </ion-grid>\n</ion-content>'/*ion-inline-end:"/Users/cybermacpro15/Desktop/TimeAttendant/timeattendant/src/pages/profile/profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_3__service_AuthenService__["a" /* AuthenService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], Profile);
    return Profile;
}());

//# sourceMappingURL=profile.js.map

/***/ })

},[361]);
//# sourceMappingURL=main.js.map