import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { FormControl } from '@angular/forms';

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

    // list of options for the sortBy field
    sortItems = [
        {value: '', viewValue: 'None'},
        {value: 'name', viewValue: 'Name'},
        {value: 'popularity', viewValue: 'Popularity'}
    ];
    // default sort value
    selectedSortValue: string;
    currentSortValue: string = '';

    // filter selection
    filterSelect = new FormControl();
    filterList = ['Rock', 'Pop', 'Rap'];
    // default filter values
    selectedFilters = ['Rock', 'Pop', 'Rap'];
    currentFilters: string[];

    state: 'small';
    // Assigning how many elements that should be displayed in a row
    column: number = 5;
    // List for displaying items in elements
    displayedElements: Artist[] = [];
    // Defines how many elements that should be displayed at a time
    limit = 15;
    constructor(private artistService: ArtistService) {}

    getArtist(): void {
        this.artistService.getArtist(this.value).subscribe(data => {
            if (this.currentSortValue !== '') {
                console.log('sorting...');
                console.log(data);
                data.sort((n1, n2): number => {
                    if (n1[this.selectedSortValue] > n2[this.selectedSortValue]) {
                        return 1;
                    }
                    if (n1[this.selectedSortValue] < n2[this.selectedSortValue]) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                console.log('done sorting');
                console.log(data);
                this.artistSearchResult = data;
            } else {
                this.artistSearchResult = data;
            }
        });
    }

    changedSort(event) {
        this.currentSortValue = event.value;
        this.getArtist();
    }

    changedFiler(event) {
        this.currentFilters = event.value;
    }

    sortBy(name) {
        this.artistSearchResult.sort((n1, n2): number => {
            if (n1[name] > n2[name]) {
                return 1;
            }
            if (n1[name] < n2[name]) {
                return -1;
            } else {
                return 0;
            }
        });
    }

    onKey(event: any) {
        if (event.keyCode === 13) {
            this.getArtist();
            return;
        }
        this.value = event.target.value;
    }

    animateMe() {
        this.state = ('small');
    }
    addItems() {
        for (let i = 0; i < this.artistSearchResult.length; i++) {
            if (this.artistSearchResult.length !== this.displayedElements.length) {
                this.displayedElements.push(this.artistSearchResult[i]);
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
