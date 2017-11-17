import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../services/artist.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
    value = '';
    artistSearchResult: Object = [];
    constructor(private artistService: ArtistService) { }

    getArtist(): void {
        this.artistSearchResult = this.artistService.getArtist(this.value);
    }

    getAllArtists(): void {
        this.artistSearchResult = this.artistService.getAllArtists();
    }

    onKey(event: any) {
        this.value = event.target.value;
    }
    ngOnInit() { }
}
