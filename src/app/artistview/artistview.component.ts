import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ArtistComponent } from '../artist/artist.component';
@Component({
  selector: 'app-artistview',
  templateUrl: './artistview.component.html',
  styleUrls: ['./artistview.component.css'],
})
export class ArtistViewComponent {
  artistDialogRef: MatDialogRef<ArtistComponent>;
  constructor(private dialog: MatDialog) { }

  clickMe(tall) {
    this.artistDialogRef = this.dialog.open(ArtistComponent, {data: {number: tall}});
  }
}
