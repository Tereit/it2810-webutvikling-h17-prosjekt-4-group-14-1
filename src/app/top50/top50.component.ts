import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Song} from '../models/song.model';
import {MatGridListModule} from '@angular/material/grid-list';
import {SongService} from '../services/song.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
    selector: 'app-top50',
    templateUrl: './top50.component.html',
    styleUrls: ['./top50.component.css'],
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

export class Top50Component implements OnInit {
  state: 'small';
  // Assigning how many elements that should be displayed in a row
  column: number = 5;
  // List for displaying items in elements
  displayedElements: Song[] = [];
  // Defines how many elements that should be displayed at a time
  limit = 15;

    songs: Song[] = [];

    country: string;
    constructor(private route: ActivatedRoute, private router: Router, private songService: SongService) { }

    getTop50Songs(): void {
      this.songService.getTop50(this.country).subscribe(data => {
        this.songs = data;
      })
    }

    animateMe() {
        this.state = ('small');
    }
    addItems() {
        for (let i = 0; i < this.songs.length; i++) {
            if (this.songs.length !== this.displayedElements.length) {
                this.displayedElements.push(this.songs[i]);
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
        this.country = this.route.snapshot.paramMap.get('country');
        this.getTop50Songs();
        this.addItems();
        this.animateMe();
    }
}
