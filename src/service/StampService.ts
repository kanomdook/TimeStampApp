import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class StampService {
    apiUrl: string = 'https://time-attendance.herokuapp.com/';
    // apiUrl: string = 'https://time-attendance-test.herokuapp.com/';
    headers: any = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    constructor(public http: HttpClient) {
    }

    private errHandler(err: any): Promise<any> {
        return Promise.reject(err.message || err);
    }

    stampIn(stampdata): Promise<any> {
        return this.http.post(this.apiUrl + 'api/checkins', stampdata, this.headers)
            .toPromise()
            .then(res => res)
            .catch(this.errHandler);
    }

    stampOut(stampdata): Promise<any> {
        return this.http.put(this.apiUrl + 'api/checkins/' + stampdata._id, stampdata, this.headers)
            .toPromise()
            .then(res => res)
            .catch(this.errHandler);
    }

    chkstamp(userid): Promise<any> {
        return this.http.get(this.apiUrl + 'api/checkins/userid/' + userid, this.headers)
            .toPromise()
            .then(res => res)
            .catch(this.errHandler);
    }

    createLeave(stampdata): Promise<any> {
        return this.http.post(this.apiUrl + 'api/leaves', stampdata, this.headers)
            .toPromise()
            .then(res => res)
            .catch(this.errHandler);
    }

    editLeave(leaveEditData): Promise<any> {
        return this.http.put(this.apiUrl + 'api/leaves/' + leaveEditData._id, leaveEditData, this.headers)
            .toPromise()
            .then(res => res)
            .catch(this.errHandler);
    }

    getLeaveList(user): Promise<any> {
        return this.http.get(this.apiUrl + 'api/leaves/userid/' + user._id, this.headers)
            .toPromise()
            .then(res => res)
            .catch(this.errHandler);
    }

    getworkStampList(yearmth, user): Promise<any> {
        return this.http.get(this.apiUrl + 'api/checkins/yearmonth&userid/' + yearmth + '/' + user._id, this.headers)
            .toPromise()
            .then(res => res)
            .catch(this.errHandler);
    }

}