import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent {
  song: any;
  constructor(
    public dialogRef: MatDialogRef<SongComponent>,
    @Inject (MAT_DIALOG_DATA) private data: any) {
      this.song = data;
    }
}
