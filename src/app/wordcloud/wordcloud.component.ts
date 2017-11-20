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
        {size: 3, text: 'amet',},
        {size: 10, text: 'sit',},
        {size: 7, text: 'eget'},
        {size: 4, text: 'mehehe',},
        {size: 17, text: 'heh',},
        {size: 2, text: 'hehehehe',},
        {size: 1, text: 'woop',},
        {size: 18, text: 'woopwoop',},
        {size: 10, text: 'wop',},
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
