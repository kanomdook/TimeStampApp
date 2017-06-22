import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ToastController } from "ionic-angular";

@Injectable()
export class StampService {
    apiUrl: string = 'https://time-attendance.herokuapp.com/';
    headers = new Headers({
        'Content-Type': 'application/json'
    });

    optionsURL = new RequestOptions({
        headers: this.headers
    });
    constructor(public http: Http, public toastCtrl: ToastController) {
    }
    stampIn(stampdata): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(this.apiUrl + 'api/checkins', stampdata, this.optionsURL).map(res => {
                return res.json();
            }).subscribe(data => {
                resolve(data);
            }, (error) => {
                this.toastErrorHandle('ไม่สามารถเชื่อมต่ออินเทอร์เน็ตได้');
                reject(error);
            });
        })
    };

    stampOut(stampdata): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.put(this.apiUrl + 'api/checkins/' + stampdata._id, stampdata, this.optionsURL).map(res => {
                return res.json();
            }).subscribe(data => {
                resolve(data);
            }, (error) => {
                this.toastErrorHandle('ไม่สามารถเชื่อมต่ออินเทอร์เน็ตได้');
                reject(error);
            });
        })
    };

    chkstamp(userid): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(this.apiUrl + 'api/checkins/userid/' + userid).map(res => {
                return res.json();
            }).subscribe(data => {
                resolve(data);
            }, (error) => {
                this.toastErrorHandle('ไม่สามารถเชื่อมต่ออินเทอร์เน็ตได้');
                reject(error);
            });
        })
    };
    createLeave(stampdata): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(this.apiUrl + 'api/leaves', stampdata, this.optionsURL).map(res => {
                return res.json();
            }).subscribe(data => {
                resolve(data);
            }, (error) => {
                this.toastErrorHandle('ไม่สามารถเชื่อมต่ออินเทอร์เน็ตได้');
                reject(error);
            });
        })
    };

    editLeave(leaveEditData): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.put(this.apiUrl + 'api/leaves/' + leaveEditData._id, leaveEditData, this.optionsURL).map(res => {
                return res.json();
            }).subscribe(data => {
                resolve(data);
            }, (error) => {
                this.toastErrorHandle('ไม่สามารถเชื่อมต่ออินเทอร์เน็ตได้');
                reject(error);
            });
        })
    };

    getLeaveList(user): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(this.apiUrl + 'api/leaves/userid/' + user._id, this.optionsURL).map(res => {
                return res.json();
            }).subscribe(data => {
                resolve(data);
            }, (error) => {
                this.toastErrorHandle('ไม่สามารถเชื่อมต่ออินเทอร์เน็ตได้');
                reject(error);
            });
        })
    };

    getworkStampList(yearmth, user): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(this.apiUrl + 'api/checkins/yearmonth&userid/' + yearmth + '/' + user._id, this.optionsURL).map(res => {
                return res.json();
            }).subscribe(data => {
                resolve(data);
            }, (error) => {
                this.toastErrorHandle('ไม่สามารถเชื่อมต่ออินเทอร์เน็ตได้');
                reject(error);
            });
        })
    };

    toastErrorHandle(message: string) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
}