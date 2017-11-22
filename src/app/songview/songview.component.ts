import {Component, Input} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Song} from '../models/song.model';
import {SongComponent} from '../song/song.component';

@Component({
  selector: 'app-songview',
  templateUrl: './songview.component.html',
  styleUrls: ['./songview.component.css']
})
export class SongViewComponent {
  @Input() song: Song = null;
  songDialogRef: MatDialogRef<SongComponent>;

  constructor(private dialog: MatDialog) { }
  clickMe() {
    this.songDialogRef = this.dialog.open(SongComponent, {data: this.song});
  }
}
