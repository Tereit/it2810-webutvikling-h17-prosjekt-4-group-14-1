import {Component} from '@angular/core';
import { artist } from './artist';
import {MatGridListModule} from '@angular/material/grid-list';


@Component({
    selector: 'app-artistview',
    templateUrl: './artistview.component.html',
    styleUrls: ['./artistview.component.css']
})


export class ArtistviewComponent {

  //Assigning how many elements that should be displayed in a row
  column: any = 5;

  artists = [
  new artist(1, 'Element111'),
  new artist(2, 'Element112'),
  new artist(3, 'Element321'),
  new artist(4, 'Element441'),
  new artist(5, 'Element442'),
  new artist(6, 'Element3211'),
  new artist(7, 'Element4715'),
];

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
