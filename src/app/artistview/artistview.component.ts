import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ArtistComponent } from '../artist/artist.component';
import { Artist } from '../models/artist.model';
import { ArtistService } from '../services/artist.service';

@Component({
    selector: 'app-artistview',
    templateUrl: './artistview.component.html',
    styleUrls: ['./artistview.component.css']
})

export class ArtistViewComponent {
  @Input() artist: Artist = null;
  artistDialogRef: MatDialogRef<ArtistComponent>;
  artistInfo: string;
  newArtist: Artist = null;

  constructor(private dialog: MatDialog, private artistService: ArtistService) {}
  clickMe() {
    this.artistService.getInfo(this.artist.mbid).subscribe(data => {
      this.artistInfo = data;
      this.artist.info = this.artistInfo;
      this.artistService.updateArtist(this.artist).subscribe(data => {
        this.newArtist = data;
        console.log(data);
      })
    })
    this.artistDialogRef = this.dialog.open(ArtistComponent, {data: this.artist});
  }
}
