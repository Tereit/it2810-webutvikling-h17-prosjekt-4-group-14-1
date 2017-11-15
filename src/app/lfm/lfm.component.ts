import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'lastFM-api',
    templateUrl: './lastFM.component.html'
})

export class LastFMComponent implements OnInit {
    values = '';
    artistSearchResult: Object = [];
    songSearchResult: Object = [];
    getSongs: boolean = true;
    getArtists: boolean = true;
    constructor(private http: HttpClient) {}

    onKey(event: any) {
        this.values = event.target.value;
    }

    retreive() {
        if (this.getArtists) {
            this.retreiveArtists();
        }
        if (this.getSongs) {
            this.retreiveSongs();
        }
    }

    getTop50() {
        this.http.get('http://localhost:8084/api/lfm/getTop50/norway')
            .subscribe(data => {
                this.songSearchResult = data;
            });
    }

    retreiveArtists() {
        this.http.get('http://localhost:8084/api/lfm/artist/' + this.values)
        .subscribe(data => {
            this.artistSearchResult = data;
        });
    }

    retreiveSongs() {
        this.http.get('http://localhost:8084/api/lfm/song/' + this.values)
        .subscribe(data => {
            this.songSearchResult = data;
        });
    }

    ngOnInit() {}
}
