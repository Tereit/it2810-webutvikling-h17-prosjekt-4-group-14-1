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
  artist =''
  word_cloud: Array<AgWordCloudData> = [];

  constructor(private artistService: ArtistService) { }

  getArtist(): void {
      this.artistService.getAllArtists().subscribe(data => {

        for(let item in data) {
          this.word_cloud.push({size: data[item].popularity, text: data[item].name});
          
        }
        //data[item].popularity
          //this.artistSearchResult = data;
          //console.log(this.artistSearchResult);
          //this.populateCloud();
          console.log(this.word_cloud);
      });
  }

  /*populateCloud(): void {
    this.artistSearchResult.forEach(artist => {
      let cloudItem = {size: 5, text:artist.name};
      this.word_cloud.push(cloudItem);
    });
  }*/
/*
  addToWordCloud() {
  for (this.artist in this.artistSearchResult) {
    let name = this.artistSearchResult[this.artist].name;
    let size = 5;
    this.word_cloud.push({size: size, text: name})

}}

}
  for (artist : this.artistSearchResult) {
  let size = artistSearchResult[artist].popularity  // 546
  let name = artistSearchResult[artist].name;
  this.word_cloud.push({size: size, text: name})
}
*/


  // Create Work Cloud Data Array
/*word_cloud: Array<AgWordCloudData> = [
        {size: 5, text: 'heheh',},
        {size: 10, text: 'mehehe',},
        {size: 3, text: 'wop',},
        {size: 19, text: 'wooop',},
];*/
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
    this.getArtist();
  }

}
