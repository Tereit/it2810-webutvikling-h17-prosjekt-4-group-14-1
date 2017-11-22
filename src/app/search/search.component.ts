import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

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
    unfilteredSearchResult: Artist[] = [];
    minPopValue: number = 0;
    profile: any;

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
    filterList: string[] = [];
    // default filter values
    selectedFilters: string[] = [];
    currentFilters: string[];

    state: 'small';
    // Assigning how many elements that should be displayed in a row
    column: number = this.setColumns();
    // List for displaying items in elements
    displayedElements: Artist[] = [];
    // Defines how many elements that should be displayed at a time
    limit = 15;
    constructor(private artistService: ArtistService, private auth: AuthService,
    private userService: UserService) {}

    getProfile(){
      if (this.auth.userProfile) {
        this.profile = this.auth.userProfile;
      } else {
        this.auth.getProfile((err, profile) => {
          this.profile = profile;
        });
      }
    };

    /**
     * @description retreives artists from the artist service, populates filters and sorts the artists
     * based on the input by the user
     */
    getArtist(): void {
        let tempData = [];
        this.currentFilters = [];

        if (this.profile){
          this.userService.updateHistory(this.profile.name, this.value).subscribe();
        }
        this.artistService.getArtist(this.value).subscribe(data => {
            let allGenres = [];
            // data retreived by artistService is not iterable, moving them to a new array
            for (let key in data) {
                tempData.push(data[key]);
            }
            // populates the list of filters
            tempData.forEach(item => {
                for (let i = 0; i < item.genres.length; i++) {
                    if (!this.findOne(this.filterList, [item.genres[i]])) {
                        this.filterList.push(item.genres[i]);
                    }
                }
            });
            // sorting the list of genre filters
            this.filterList.sort((n1, n2): number => {
                return n1.toLowerCase().localeCompare(n2.toLowerCase());
            });
            this.unfilteredSearchResult = tempData;
            this.currentFilters = this.selectedFilters;
            this.artistSearchResult = this.sortResults(this.filterSearch(tempData));
        });
    }

    /**
     * @description determine if an array contains one or more items from another array.
     * @param {array} haystack the array to search.
     * @param {array} arr the array providing items to check for in the haystack.
     * @return {boolean} true|false if haystack contains at least one item from arr.
     */
    findOne(haystack, arr) {
        return arr.some(function (v) {
            return haystack.indexOf(v) >= 0;
        });
    }

    /**
     * @description sets the currently selected sort value and triggers an update of the list
     * @param event the event that triggered the function
     */
    changedSort(event) {
        this.currentSortValue = event.value;
        this.getArtist();
    }

    /**
     * @description sorts the list of artists
     * @param {array} tempData array of artist objects to sort
     * @return {array} sorted array of artist objects
     */
    sortResults(tempData) {
        if (this.currentSortValue === 'popularity') {
            tempData.sort((n1, n2): number => {
                return n2.popularity - n1.popularity;
            });
        } else if (this.currentSortValue !== '') {
            tempData.sort((n1, n2): number => {
                return n1['name'].toLowerCase().localeCompare(n2['name'].toLowerCase());
            });
        }
        return tempData;
    }

    /**
     * @description sets minimum popularity value and triggers filtering by popularity
     * @param event the triggering event
     */
    filterByPop(event) {
        this.minPopValue = event.target.value;
        this.filterSearch();
    }

    /**
     * @description filters the array of artists if provided, if not it uses this.artistSearchResult
     * uses filters set by the user
     * @param tempData optional array to be filtered
     */
    filterSearch(tempData = null) {
        if (tempData != null) {
            if (this.currentFilters.length < 1) { return tempData; }
            return tempData.filter(artist => this.findOne(this.currentFilters, artist.genres))
                .filter(artist => artist.popularity > this.minPopValue);
        }
        if (this.currentFilters.length < 1) {
            // filters by min popularity if no genre filters are set
            this.artistSearchResult = this.unfilteredSearchResult.filter(artist => artist.popularity > this.minPopValue);
        } else {
            // filters by both genre filters and min popularity
            this.artistSearchResult = this.unfilteredSearchResult
                .filter(artist => this.findOne(this.currentFilters, artist.genres))
                .filter(artist => artist.popularity > this.minPopValue);
        }
    }

    /**
     * @description sets genre filters and triggers filtering
     * @param event the triggering event
     */
    changedFilter(event) {
        this.currentFilters = event.value;
        this.filterSearch();
    }

    /**
     * @description sets search input by user, will trigger search if the trigger event is the enter key
     * @param event the triggering event
     */
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

    /**
     * @description adds a new row of artists to be displayed if there's room
     */
    addItems() {
        for (let i = 0; i < this.artistSearchResult.length; i++) {
            if (this.artistSearchResult.length !== this.displayedElements.length) {
                this.displayedElements.push(this.artistSearchResult[i]);
                this.animateMe();
            }
        }
    }

    /**
     * @description triggers everytime a scroll event is performed, will increase the amount of artists that are displayed
     */
    onScroll() {
        // Detects when you reach the bottom, and then adds 5 more results.
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
            this.limit = this.limit + 5;
            this.addItems();
        }
    }

    /**
     * @description changes the amount of columns used in the grid display
     * @param event the triggering event
     */
    onResize(event) {
        const element = event.target.innerWidth;
        if (element > 1500) {
            this.column = 5;
        } else if (element > 1200) {
            this.column = 4;
        } else if (element > 900) {
            this.column = 3;
        } else if (element > 600) {
            this.column = 2;
        } else if (element > 300) {
            this.column = 1;
        }
    }

    /**
     * @description sets the initial amount of columns to use based on the device width
     */
    setColumns(): number {
        const width = document.documentElement.clientWidth;
        if (width > 1500) {
            return 5;
        } else if (width > 1200) {
            return 4;
        } else if (width > 900) {
            return 3;
        } else if (width > 600) {
            return 2;
        } else if (width > 300) {
            return 1;
        }
    }
    ngOnInit() {
        this.addItems();
        this.animateMe();
        this.getProfile();
    }
}
