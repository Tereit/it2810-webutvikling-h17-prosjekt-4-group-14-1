import Artist from '../models/artist.model';
import { Observable } from 'rxjs/observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class ArtistService {

  api_url     = environment.api_url;
  artist_url  = this.api_url + '/artist/';
  getInfo_url = this.api_url + '/artist/info/';

  constructor(private http: HttpClient) { }

  /**
   * @description will get all artists currently in our database
   * @returns {array} array of all the artists in the database
   */
  getAllArtists(): Observable<Artist[]> {
    return this.http.get(this.artist_url).map(res => {
      console.log('Getting all artists...');
      return res as Artist[];
    });
  }

  /**
   * @description tries to match with a specificly named artist
   * @param {string} name name of the artists to be retreived
   * @returns {array} array of all artists that matched the query
   */
  getArtist(name: string): Observable<Artist[]> {
    return this.http.get(this.artist_url + name).map(res => {
      console.log('Getting artist: ' + name);
      return res as Artist[];
    });
  }

  /**
   * @description gets extra information about a specific artist from lastFM
   * @param {string} mbid the lastFM id of the artist
   * @returns {array} resulting information from the query to lastFM
   */
  getInfo(mbid: string): Observable<any> {
    return this.http.get(this.getInfo_url + mbid).map(res => {
      console.log('Getting info for MBID: ' + mbid);
      return res as Object[];
    });
  }
}
