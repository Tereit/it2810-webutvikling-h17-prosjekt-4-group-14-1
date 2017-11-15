import {Component} from '@angular/core';
import {ArtistViewComponent} from '../artistview/artistview.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-songview',
  templateUrl: './songview.component.html',
  styleUrls: ['./songview.component.css']
})
export class SongViewComponent {
  constructor(private dialog: MatDialog) { }
  clickMe(){
    const dialogRef = this.dialog.open(ArtistViewComponent, {
      height: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
