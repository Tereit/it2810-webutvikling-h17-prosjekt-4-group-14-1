import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist.model';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
    column: any = 5;
    value = '';
    artistSearchResult: Artist[] = [];
    constructor(private artistService: ArtistService) { }

    getArtist(): void {
        console.log('search para: ' + this.value);
        this.artistService.getArtist(this.value).subscribe(data => this.artistSearchResult = data);
    }

    onKey(event: any) {
        this.value = event.target.value;
    }
    ngOnInit() { }
}
