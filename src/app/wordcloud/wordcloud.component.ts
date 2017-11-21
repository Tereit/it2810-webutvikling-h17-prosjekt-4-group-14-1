import { Component, OnInit } from '@angular/core';
import { AgWordCloudData, AgWordCloudModule} from 'angular4-word-cloud'
import {ArtistService} from '../services/artist.service';
import { Artist } from '../models/artist.model';

@Component({
  selector: 'app-wordcloud',
  templateUrl: './wordcloud.component.html',
  styleUrls: ['./wordcloud.component.css']
})
export class WordcloudComponent implements OnInit {
  artistSearchResult: Artist[]=[];

  constructor(private artistService: ArtistService) { }
/*
  getArtist(): void {
      this.artistService.getAllArtists().subscribe(data => {
          this.artistSearchResult = data;
          // console.log(this.artistSearchResult);
      });
  }*/
/*for (artist : this.artistSearchResult) {
  let size = artistSearchResult[artist].popularity  // 546
  let name = artistSearchResult[artist].name;
  this.word_cloud.push({size: size, text: name})
}*/
  // Create Work Cloud Data Array
word_cloud: Array<AgWordCloudData> = [
        {size: 6, text: 'vitae',},
];
// Word Cloud Options
options = {
    settings: {
        minFontSize: 10,
        maxFontSize: 100,
    },
    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    },
    labels: true // false to hide hover labels
};

  ngOnInit() {
  }

}
