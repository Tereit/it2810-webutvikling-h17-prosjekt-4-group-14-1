import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Artist} from '../models/artist.model';
import {MatGridListModule} from '@angular/material/grid-list';
import {ArtistService} from '../services/artist.service';

@Component({
    selector: 'app-top50',
    templateUrl: './top50.component.html',
    styleUrls: ['./top50.component.css']
})

export class Top50Component implements OnInit {
    column: any = 5;

    artists: Artist[] = [];

    country: string;
    constructor(private route: ActivatedRoute, private router: Router, private artistService: ArtistService) { }

    getArtists() {
        this.artistService.getAllArtists()
        .subscribe(data => {
            this.artists = data;
        });
    }

    onresize(event) {
        // do nothing
    }
    ngOnInit() {
        this.country = this.route.snapshot.paramMap.get('country');
        this.getArtists();
    }
}
