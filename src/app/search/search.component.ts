import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    animations: [
        trigger('Animation', [
            state('small', style({
                transform: 'scale(1)',
            })),
            transition('* <=> *', animate('1000ms ease-in', keyframes([
                style({opacity: 0, transform: 'translateY(0%)', offset: 0}),
                style({opacity: 0.5, transform: 'translateY(0px)',  offset: 0.5}),
                style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
            ]))),
        ])
    ]
})

export class SearchComponent implements OnInit {
    value = '';
    artistSearchResult: Artist[] = [];

    state: 'small';
    // Assigning how many elements that should be displayed in a row
    column: any = 5;
    // List for displaying items in elements
    displayedElements: Artist[] = [];
    // Defines how many elements that should be displayed at a time
    limit = 5;
    constructor(private artistService: ArtistService) {
        // this.addItems();
        // this.animateMe();
    }

    getArtist(): void {
        console.log('search para: ' + this.value);
        this.artistService.getArtist(this.value).subscribe(data => this.artistSearchResult = data);
    }

    onKey(event: any) {
        this.value = event.target.value;
    }

    animateMe() {
        this.state = ('small');
    }
    addItems() {
        for (let i = 0; i < this.artistSearchResult.length; i++) {
            if (this.artistSearchResult.length !== this.displayedElements.length) {
                this.displayedElements.push(this.artistSearchResult[i]);
                console.log(this.displayedElements);
                this.animateMe();
            }
        }
    }
    // Runs each time you scroll
    onScroll() {
        // Detects when you reach the bottom, and then adds 5 more results.
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
            this.limit = this.limit + 5;
            this.addItems();
        }
    }
    // Making grid list responsive
    onResize(event) {
        const element = event.target.innerWidth;
        console.log(element);
        if (element > 1050) {
            this.column = 5;
        }
        if (element > 950 && element < 1050) {
            this.column = 4;
        }
        if (element < 850) {
            this.column = 3;
        }
        if (element < 750) {
            this.column = 2;
        }
        if (element < 650) {
            this.column = 1;
        }
    }
    ngOnInit() {
        this.addItems();
        this.animateMe();
    }
}
