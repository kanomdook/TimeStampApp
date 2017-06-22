import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthenService {
  apiUrl: string = 'https://time-attendance.herokuapp.com/';
  headers = new Headers({
    'Content-Type': 'application/json'
  });

  optionsURL = new RequestOptions({
    headers: this.headers
  });
  constructor(public http: Http) {

  }

  getEmpDataApi(email): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + 'api/Employeeprofile/email/' + email).map(res => {
        return res.json();
      }).subscribe(data => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    })
  }

  signUp(register): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'api/auth/signup', register, this.optionsURL).map(res => {
        return res.json();
      }).subscribe(data => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    })
  };

  updateProfile(profile): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.apiUrl + 'api/employeeprofiles/' + profile._id, profile, this.optionsURL).map(res => {
        return res.json();
      }).subscribe(data => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    })
  };

  signIn(signin): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'api/auth/signin', signin, this.optionsURL).map(res => {
        return res.json();
      }).subscribe(data => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    })
  };
}