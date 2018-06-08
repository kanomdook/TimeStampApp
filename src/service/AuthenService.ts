import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenService {
  apiUrl: string = 'https://time-attendance.herokuapp.com/';
  // apiUrl: string = 'https://time-attendance-test.herokuapp.com/';

  constructor(public http: HttpClient) {

  }

  private errHandler(err: any): Promise<any> {
    return Promise.reject(err.message || err);
  }

  getEmpDataApi(email): Promise<any> {
    return this.http.get(this.apiUrl + 'api/Employeeprofile/email/' + email)
      .toPromise()
      .then(res => res)
      .catch(this.errHandler);
  }

  signUp(register): Promise<any> {
    return this.http.post(this.apiUrl + 'api/auth/signup', register)
      .toPromise()
      .then(res => res)
      .catch(this.errHandler);
  }

  updateProfile(profile): Promise<any> {
    return this.http.put(this.apiUrl + 'api/employeeprofiles/' + profile._id, profile)
      .toPromise()
      .then(res => res)
      .catch(this.errHandler);
  }

  signIn(signin): Promise<any> {
    return this.http.post(this.apiUrl + 'api/auth/signin', signin)
      .toPromise()
      .then(res => res)
      .catch(this.errHandler);
  }




  // getEmpDataApi(email): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.http.get(this.apiUrl + 'api/Employeeprofile/email/' + email).map(res => {
  //       return res.json();
  //     }).subscribe(data => {
  //       resolve(data);
  //     }, (error) => {
  //       reject(error);
  //     });
  //   })
  // }

  // signUp(register): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.http.post(this.apiUrl + 'api/auth/signup', register, this.optionsURL).map(res => {
  //       return res.json();
  //     }).subscribe(data => {
  //       resolve(data);
  //     }, (error) => {
  //       reject(error);
  //     });
  //   })
  // };

  // updateProfile(profile): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.http.put(this.apiUrl + 'api/employeeprofiles/' + profile._id, profile, this.optionsURL).map(res => {
  //       return res.json();
  //     }).subscribe(data => {
  //       resolve(data);
  //     }, (error) => {
  //       reject(error);
  //     });
  //   })
  // };

  // signIn(signin): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.http.post(this.apiUrl + 'api/auth/signin', signin, this.optionsURL).map(res => {
  //       return res.json();
  //     }).subscribe(data => {
  //       resolve(data);
  //     }, (error) => {
  //       reject(error);
  //     });
  //   })
  // };
}