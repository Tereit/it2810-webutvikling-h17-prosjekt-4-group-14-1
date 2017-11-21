import { Observable } from 'rxjs/observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import {Song} from '../models/song.model';

@Injectable()
export class SongService {

  api_url    = 'http://localhost:8084/api';
  top50_url = this.api_url + '/lfm/top50/';

  constructor(private http: HttpClient) { }

  getTop50(country): Observable<Song[]> {
    return this.http.get(this.top50_url + country).map(res => {
      return res as Song[];
    })
  }
}
