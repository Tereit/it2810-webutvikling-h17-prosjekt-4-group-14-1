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


// components
import { AppComponent } from './app.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { ArtistViewComponent } from './artistview/artistview.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { SongViewComponent } from './songview/songview.component';
import { TestComponent } from './testComponent/test.component';
import { Top50Component } from './top50/top50.component';
import { ArtistComponent } from './artist/artist.component';

// services
import { ArtistService } from './services/artist.service';

// pipes
import { IterableDictPipe } from './pipes/iterableDictPipe';

const appRoutes: Routes = [
  {path: '', component: FrontpageComponent},
  {path: 'top50/:country', component: Top50Component},
  {path: 'test', component: TestComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FrontpageComponent,
    IterableDictPipe,
    NavbarComponent,
    SearchComponent,
    SongViewComponent,
    TestComponent,
    ArtistViewComponent,
    Top50Component,
    ArtistComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatMenuModule,
    RouterModule.forRoot(appRoutes),
    InfiniteScrollModule
  ],
  entryComponents: [
    ArtistComponent
  ],
  providers: [ArtistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
