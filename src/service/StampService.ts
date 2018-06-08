import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class StampService {
    apiUrl: string = 'https://time-attendance.herokuapp.com/';
    // apiUrl: string = 'https://time-attendance-test.herokuapp.com/';

    constructor(public http: HttpClient) {
    }

    private errHandler(err: any): Promise<any> {
        return Promise.reject(err.message || err);
    }

    stampIn(stampdata): Promise<any> {
        return this.http.post(this.apiUrl + 'api/checkins', stampdata)
            .toPromise()
            .then(res => res)
            .catch(this.errHandler);
    }

    stampOut(stampdata): Promise<any> {
        return this.http.put(this.apiUrl + 'api/checkins/' + stampdata._id, stampdata)
            .toPromise()
            .then(res => res)
            .catch(this.errHandler);
    }

    chkstamp(userid): Promise<any> {
        return this.http.get(this.apiUrl + 'api/checkins/userid/' + userid)
            .toPromise()
            .then(res => res)
            .catch(this.errHandler);
    }







    // stampOut(stampdata): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.http.put(this.apiUrl + 'api/checkins/' + stampdata._id, stampdata, this.optionsURL).map(res => {
    //             return res.json();
    //         }).subscribe(data => {
    //             resolve(data);
    //         }, (error) => {
    //             reject(error);
    //         });
    //     })
    // };

    // chkstamp(userid): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.http.get(this.apiUrl + 'api/checkins/userid/' + userid).map(res => {
    //             return res.json();
    //         }).subscribe(data => {
    //             resolve(data);
    //         }, (error) => {
    //             reject(error);
    //         });
    //     })
    // };


    // createLeave(stampdata): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.http.post(this.apiUrl + 'api/leaves', stampdata, this.optionsURL).map(res => {
    //             return res.json();
    //         }).subscribe(data => {
    //             resolve(data);
    //         }, (error) => {
    //             reject(error);
    //         });
    //     })
    // };

    // editLeave(leaveEditData): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.http.put(this.apiUrl + 'api/leaves/' + leaveEditData._id, leaveEditData, this.optionsURL).map(res => {
    //             return res.json();
    //         }).subscribe(data => {
    //             resolve(data);
    //         }, (error) => {
    //             reject(error);
    //         });
    //     })
    // };

    // getLeaveList(user): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.http.get(this.apiUrl + 'api/leaves/userid/' + user._id, this.optionsURL).map(res => {
    //             return res.json();
    //         }).subscribe(data => {
    //             resolve(data);
    //         }, (error) => {
    //             reject(error);
    //         });
    //     })
    // };

    // getworkStampList(yearmth, user): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.http.get(this.apiUrl + 'api/checkins/yearmonth&userid/' + yearmth + '/' + user._id, this.optionsURL).map(res => {
    //             return res.json();
    //         }).subscribe(data => {
    //             resolve(data);
    //         }, (error) => {
    //             reject(error);
    //         });
    //     })
    // };

}