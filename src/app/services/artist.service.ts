import Artist from '../models/artist.model';
import { Observable } from 'rxjs/observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class ArtistService {

  api_url     = 'http://localhost:8084/api';
  artist_url  = this.api_url + '/artist/';
  getInfo_url = this.api_url + '/artist/info/';

  constructor(private http: HttpClient) { }

  getAllArtists(): Observable<Artist[]> {
    return this.http.get(this.artist_url).map(res => {
      console.log('Getting all artists...');
      return res as Artist[];
    });
  }

  getArtist(name: string): Observable<Artist[]> {
    return this.http.get(this.artist_url + name).map(res => {
      console.log('Getting artist: ' + name);
      return res as Artist[];
    });
  }

  getInfo(mbid: string): Observable<any> {
    return this.http.get(this.getInfo_url + mbid).map(res => {
      console.log('Getting info for MBID: ' + mbid);
      return res as Object[];
    });
  }

  createArtist(artist: Artist): Observable<any> {
    return this.http.post(`${this.artist_url}`, artist).map(res => {
      console.log('Attempting to create artist: ' + artist);
      return res as Artist[];
    });
  }

  updateArtist(artist: Artist){
    return this.http.put(this.artist_url + artist._id, artist).map(res => {
      console.log('Attempting to update artist...');
      return res as Artist;
    })
  }
}
