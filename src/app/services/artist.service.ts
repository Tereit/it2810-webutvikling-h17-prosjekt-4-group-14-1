import Artist from '../models/artist.model';
import { Observable } from 'rxjs/observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class ArtistService {

  api_url    = 'http://localhost:8084/api';
  artist_url = this.api_url + '/artist/';

  constructor(private http: HttpClient) { }

  getAllArtists(): Observable<Artist[]> {
    return this.http.get(this.artist_url).map(res => {
      return res as Artist[];
    });
  }

  getArtist(name: string): Observable<Artist[]> {
    return this.http.get(this.artist_url + name).map(res => {
      return res as Artist[];
    });
  }

  createArtist(artist: Artist): Observable<any> {
    console.log('In service: ', artist);
    console.log(`${this.artist_url}`, artist);
    return this.http.post(`${this.artist_url}`, artist).map(res => {
      return res as Artist[];
    });
  }
}
