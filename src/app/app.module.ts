import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';


// components
import { AppComponent } from './app.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { ArtistViewComponent } from './artistview/artistview.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { SongViewComponent } from './songview/songview.component';
import { Top50Component } from './top50/top50.component';
import { ArtistComponent } from './artist/artist.component';

// services
import { ArtistService } from './services/artist.service';
import { SongService } from './services/song.service';

// pipes
import { IterableDictPipe } from './pipes/iterableDictPipe';
import { SongComponent } from './song/song.component';

const appRoutes: Routes = [
  {path: '', component: FrontpageComponent},
  {path: 'top50/:country', component: Top50Component},
  {path: 'search', component: SearchComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FrontpageComponent,
    IterableDictPipe,
    NavbarComponent,
    SearchComponent,
    SongViewComponent,
    ArtistViewComponent,
    Top50Component,
    ArtistComponent,
    SongComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatMenuModule,
    RouterModule.forRoot(appRoutes),
    InfiniteScrollModule
  ],
  entryComponents: [
    ArtistComponent,
    SongComponent
  ],
  providers: [ArtistService, SongService],
  bootstrap: [AppComponent]
})
export class AppModule { }
