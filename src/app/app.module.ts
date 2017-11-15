import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';

import { AppComponent } from './app.component';
import { ArtistComponent } from './artist/artist.component';
import { ArtistViewComponent } from './artistview/artistview.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { SongViewComponent } from './songview/songview.component';
import { Top50Component } from './top50/top50.component';

const appRoutes: Routes = [
  {path: '', component: FrontpageComponent},
  {path: 'top50/:country', component: Top50Component},
];

@NgModule({
  declarations: [
    AppComponent,
    ArtistComponent,
    ArtistViewComponent,
    FrontpageComponent,
    NavbarComponent,
    SearchComponent,
    SongViewComponent,
    Top50Component
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes),
    MatDialogModule,
    MatGridListModule,
  ],
  entryComponents: [
    ArtistComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
