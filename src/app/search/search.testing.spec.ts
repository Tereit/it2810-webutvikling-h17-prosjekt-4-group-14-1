import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { IterableDictPipe } from '../pipes/iterableDictPipe';
import { ArtistService } from '../services/artist.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Artist } from '../models/artist.model';

describe('Sorting', () => {
    let comp: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;
    let artistService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SearchComponent,
                IterableDictPipe
            ],
            imports: [
                InfiniteScrollModule,
                HttpClientModule,
                HttpClientTestingModule
            ],
            providers: [
                ArtistService,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(SearchComponent);
        comp = fixture.componentInstance;
        artistService = fixture.debugElement.injector.get(ArtistService);
    });

    it('should create', () => {
        expect(comp).toBeTruthy();
    });

});
