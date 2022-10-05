import 'rxjs/add/operator/toPromise';
import {URLSearchParams , RequestOptions,Headers} from '@angular/http';

import { Injectable } from '@angular/core';

import { Api, ApiNative } from '../../providers';

import { HTTP } from '@ionic-native/http';

/**

 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any = null;
  token: any = null;
  username: any = null;

  constructor(public apiNative: ApiNative , public api: Api, private http: HTTP) { }


  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let body = new URLSearchParams();
    let body1 = new URLSearchParams();
    body.set('username', accountInfo.username);
    body.set('password', accountInfo.password);

    let headers = new Headers();
   
    //headers.append('Access-Control-Allow-Origin','*');

    const options = new RequestOptions({headers: headers, params : body});

    let seq = this.api.post('providers/login', body1,options ).map(resp => resp.json());

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      console.log()
      if ('token' in res  && res.token != '') {
        this.username = accountInfo.username; 
        this._loggedIn(res);
      } else {
        this._user = null;
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  /*login(accountInfo: any) {
    let body = { 'username' : accountInfo.username, 'password' : accountInfo.password};  
    //headers.append('Access-Control-Allow-Origin','*');
    //const options = new RequestOptions({headers: headers, params : body});
    const httpHeader = {'Content-Type':  'application/x-www-form-urlencoded'};
    let seq = this.apiNative.post('providers/login', body, httpHeader ).map(resp => JSON.parse(resp.data));

    seq.subscribe((res: any) => {
      console.log('heyy')
      console.log(res);
      // If the API returned a successful response, mark the user as logged in
      console.log()
      if ('token' in res  && res.token != '') {
        this.username = accountInfo.username; 
        this._loggedIn(res);
      } else {
        this._user = null;
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }*/
  // /**
  //  * Send a POST request to our signup endpoint with the data
  //  * the user entered on the form.
  //  */
  // signup(accountInfo: any) {
  //   let seq = this.api.post('signup', accountInfo).share();

  //   seq.subscribe((res: any) => {
  //     // If the API returned a successful response, mark the user as logged in
      
  //   }, err => {
  //     console.error('ERROR', err);
  //   });

  //   return seq;
  // }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;

    this.token = resp.token;
  }
}
