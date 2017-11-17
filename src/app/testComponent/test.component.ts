import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../services/artist.service';
import Artist from '../models/artist.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',

})
export class TestComponent implements OnInit {

  public newArtist: Artist = new Artist();

  artistList: Artist[];
  artistList2: Artist[] = [];
  editedArtists: Artist[] = [];
  songSearchResult: Object = [];
  artistSearchResult: Object = [];

  constructor(private artistService: ArtistService, private http: HttpClient) { }

  ngOnInit(): void {

    // this.getAllArtists();
    // this.createArtist();
    // this.getTop50();
    // this.retreiveArtists('metallica');
    // this.artistSearch('test');

    this.getArtist('test');
    this.artistSearch('metallica');

  }

  getAllArtists() {
    this.artistService.getAllArtists().subscribe(artists => {
      this.artistList = artists;
      // console.log('Artists: ', this.artistList);
    });
  }

  getArtist(name: string) {
    this.artistService.getArtist('test4').subscribe(artist => {
      this.artistList2 = artist;
      // console.log(this.artistList2);
    });
  }

  createArtist(artist: Artist) {
    this.artistService.createArtist(artist);
    this.getAllArtists();
  }

  getTop50() {
    this.http.get('http://localhost:8084/api/lfm/getTop50/norway')
      .subscribe(data => {
        this.songSearchResult = data;
        console.log(this.songSearchResult);
      });
  }

  retreiveArtists(name: string) {
    this.http.get('http://localhost:8084/api/lfm/artist/' + name)
      .subscribe(data => {
        this.artistSearchResult = data;
        console.log(this.artistSearchResult);
      });
  }

  artistSearch(name: string) {
    let tempResult: Object = [];
    this.artistService.getArtist(name).subscribe(artist => {
      if (Object.keys(artist).length === 0) {
        this.http.get('http://localhost:8084/api/lfm/artist/' + name)
        .subscribe(data => {
          tempResult = data;
          for (let key in tempResult) {
            console.log(tempResult[key].name);
            let tempArtist = new Artist();
            tempArtist.name = tempResult[key].name;
            tempArtist.mbid = tempResult[key].mbid;
            tempArtist.img = tempResult[key].img;
            this.createArtist(tempArtist);
          }
        });
      } else {
        console.log('No content!!');
      }
    });
  }
}