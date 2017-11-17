import {Component} from '@angular/core';
import { artist } from './artist';
//import { InfiniteScroll } from 'ngx-infinite-scroll';
import {MatGridListModule} from '@angular/material/grid-list';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';


@Component({
    selector: 'app-artistview',
    templateUrl: './artistview.component.html',
    styleUrls: ['./artistview.component.css'],
    animations: [
      trigger('myAwesomeAnimation', [
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


export class ArtistviewComponent {
  state: string = 'small';

  //Assigning how many elements that should be displayed in a row
  column: any = 5;

  //List for displaying items in elements
  displayedElements: any[] = [];

  //Used as an "i in elements"
  i =''

  //Defines how many elements that should be displayed at a time
  limit=5


  artists = [
  new artist(1, 'Element111'),
  new artist(2, 'Element112'),
  new artist(3, 'Element321'),
  new artist(4, 'Element441'),
  new artist(5, 'Element442'),
  new artist(6, 'Element3211'),
  new artist(7, 'Element4715'),
  new artist(1, 'Element111'),
  new artist(2, 'Element112'),
  new artist(3, 'Element321'),
  new artist(4, 'Element441'),
  new artist(5, 'Element442'),
  new artist(6, 'Element3211'),
  new artist(7, 'Element4715'),
  new artist(1, 'Element111'),
  new artist(2, 'Element112'),
  new artist(3, 'Element321'),
  new artist(4, 'Element441'),
  new artist(5, 'Element442'),
  new artist(6, 'Element3211'),
  new artist(7, 'Element4715'),
  new artist(1, 'Element111'),
  new artist(2, 'Element112'),
  new artist(3, 'Element321'),
  new artist(4, 'Element441'),
  new artist(5, 'Element442'),
  new artist(6, 'Element3211'),
  new artist(7, 'Element4715'),
  new artist(1, 'Element111'),
  new artist(2, 'Element112'),
  new artist(3, 'Element321'),
  new artist(4, 'Element441'),
  new artist(5, 'Element442'),
  new artist(6, 'Element3211'),
  new artist(7, 'Element4715'),
];

constructor(){
  this.addItems();
  this.animateMe();
}

animateMe() {
        this.state = (this.state === 'small' ? 'large' : 'small');
  }

//Adds one element at a time to the displayedElements list until there are no more
//elements to add.
addItems(){
  for (this.i in this.artists){
    if (this.artists.length != this.displayedElements.length){
      this.displayedElements.push(artist);
      console.log(this.displayedElements);
      this.animateMe();
    }
  }
}

//Runs each time you scroll
onScroll() {
    console.log('Scrolled!')
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      this.addItems();
      console.log("Bottom");
    // you're at the bottom of the page
  }
}


//Making grid list responsive
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
}
