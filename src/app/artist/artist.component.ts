import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
})
export class ArtistComponent {
  artist: any;
  constructor(
    public dialogRef: MatDialogRef<ArtistComponent>,
    @Inject (MAT_DIALOG_DATA) private data: any
) {
    this.artist = data;
}
