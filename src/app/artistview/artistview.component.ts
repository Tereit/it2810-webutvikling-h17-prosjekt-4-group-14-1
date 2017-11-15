import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ArtistComponent } from '../artist/artist.component';

@Component({
  selector: 'app-artistview',
  templateUrl: './artistview.component.html',
  styleUrls: ['./artistview.component.css'],
})
export class ArtistViewComponent {
  @Input() artist: any;
  artistDialogRef: MatDialogRef<ArtistComponent>;
  constructor(private dialog: MatDialog) { }
  clickMe(tall){
    this.artistDialogRef = this.dialog.open(ArtistComponent, {artist: this.artist});
  }
}
