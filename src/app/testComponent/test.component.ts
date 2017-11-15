import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../services/artist.service';
import Artist from '../models/artist.model';
import { HttpClient } from '@angular/common/http'

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
    var helloArtist = new Artist();
    helloArtist.name = 'hello';
    helloArtist.mbid = 'head';
    helloArtist.img = 'adfdaf';

    this.artistSearch('metallica');
    this.createArtist(helloArtist)

  }

  getAllArtists() {
    this.artistService.getAllArtists().subscribe(artists => {
      this.artistList = artists;
      console.log('Artists: ', this.artistList);
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
    this.artistService.getArtist(name).subscribe(artist => {
      if (Object.keys(artist).length === 0) {
        this.http.get('http://localhost:8084/api/lfm/artist/' + name)
          .subscribe(data => {
            for (var x in data) {
              let tempArtist = new Artist();
              tempArtist.name = data[x].name;
              tempArtist.mbid = data[x].mbid;
              tempArtist.img = data[x].img;
              this.createArtist(tempArtist);
            }
          }
      } else {
        console.log('had some content!', artist);
      }
    }
}
}
