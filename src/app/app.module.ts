import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { Top50Component } from './top50/top50.component';
import { ArtistService } from './services/artist.service';

import { TestComponent } from './testComponent/test.component';

const appRoutes: Routes = [
  {path: '', component: FrontpageComponent},
  {path: 'top50/:country', component: Top50Component},
  {path: 'test', component: TestComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FrontpageComponent,
    NavbarComponent,
    SearchComponent,
    Top50Component,
    TestComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [ArtistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
