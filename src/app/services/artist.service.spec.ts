import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { IterableDictPipe } from '../pipes/iterableDictPipe';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Artist } from '../models/artist.model';
import { ArtistService } from './artist.service';

describe('Service: ArtistService', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule
            ],
            providers: [
                ArtistService,
            ]
        });
    }));

    afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
        backend.verify();
    }));

    it('should get an artist from mock service', () => {
        async(inject([HttpClient, HttpTestingController],
        (http: HttpClient, backend: HttpTestingController) => {
            http.get('/api/artist').subscribe((data) => {
                expect(data).toEqual({name: 'artist1'});
            });

            backend.match({
                url: '/api/artist',
                method: 'GET'
            })[0].flush({name: 'artist1'});
        }));
    });
});
