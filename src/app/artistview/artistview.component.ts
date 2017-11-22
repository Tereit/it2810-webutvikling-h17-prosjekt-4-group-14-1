import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ArtistComponent } from '../artist/artist.component';
import { Artist } from '../models/artist.model';

@Component({
    selector: 'app-artistview',
    templateUrl: './artistview.component.html',
    styleUrls: ['./artistview.component.css']
})

export class ArtistViewComponent {
  @Input() artist: Artist = null;
  artistDialogRef: MatDialogRef<ArtistComponent>;
  artistInfo: string;
  artistPop: string;
  artistGenres: string[];
  newArtist: Artist = null;

  constructor(private dialog: MatDialog) {}

  /**
   * @description opens a dialog with additional information about this artist
   */
  clickMe() {
    this.artistDialogRef = this.dialog.open(ArtistComponent, {data: this.artist});
  }
}
