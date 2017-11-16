import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Artist} from './artist';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
    selector: 'app-top50',
    templateUrl: './top50.component.html',
    styleUrls: ['./top50.component.css']
})

export class Top50Component implements OnInit {
    column: any = 5;

    artists = [
        new Artist(1, 'Element111'),
        new Artist(2, 'Element112'),
        new Artist(3, 'Element321'),
        new Artist(4, 'Element441'),
        new Artist(5, 'Element442'),
        new Artist(6, 'Element3211'),
        new Artist(7, 'Element4715'),
    ];

    country: string;
    constructor(private route: ActivatedRoute, private router: Router) { }

    onresize(event) {
        // do nothing
    }
    ngOnInit() {
        this.country = this.route.snapshot.paramMap.get('country');
    }
}
