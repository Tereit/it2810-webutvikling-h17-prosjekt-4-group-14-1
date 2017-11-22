import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatDialogModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AgWordCloudModule } from 'angular4-word-cloud';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

// components
import { AppComponent } from './app.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { ArtistViewComponent } from './artistview/artistview.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { SongViewComponent } from './songview/songview.component';
import { Top50Component } from './top50/top50.component';
import { ArtistComponent } from './artist/artist.component';
import { SongComponent } from './song/song.component';
import { WordcloudComponent } from './wordcloud/wordcloud.component';
import { CallbackComponent } from './callback/callback.component';
import {ProfileComponent} from './profile/profile.component';

// services
import { ArtistService } from './services/artist.service';
import { SongService } from './services/song.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/authGuard.service';

// pipes
import { IterableDictPipe } from './pipes/iterableDictPipe';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-5/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const appRoutes: Routes = [
  {path: '', component: FrontpageComponent},
  {path: 'top50/:country', component: Top50Component},
  {path: 'search', component: SearchComponent},
  {path: 'signup', component: SignupComponent },
  {path: 'login', component: LoginComponent},
  {path: 'wordcloud', component: WordcloudComponent},
  {path: 'profile', canActivate:[AuthGuardService], component: ProfileComponent},
  {path: 'callback', component: CallbackComponent},
  {path: '**', redirectTo: ''}
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
    SongComponent,
    SignupComponent,
    LoginComponent,
    WordcloudComponent,
    CallbackComponent,
    ProfileComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatMenuModule,
    NgbCollapseModule,
    RouterModule.forRoot(appRoutes),
    InfiniteScrollModule,
    AngularFontAwesomeModule,
    AgWordCloudModule.forRoot(),
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  entryComponents: [
    ArtistComponent,
    SongComponent
  ],
  providers: [ArtistService, SongService, AuthService, AuthGuardService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
