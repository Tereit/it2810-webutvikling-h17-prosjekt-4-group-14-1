import { Observable } from 'rxjs/observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

import User from '../models/user.model';

import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  api_url  = 'http://localhost:8084/api/user/';

  constructor(private http: HttpClient) { }

  getHistory(user: string) {
    return this.http.get(this.api_url + user).map(res => {
      return res;
    })
  }

  updateHistory(user: string, search: string){
    let tempUser = new User();
    tempUser.name = user;
    tempUser.search = search;
    return this.http.post(this.api_url + user, tempUser).map(res => {
      return res;
    })
  }


}
