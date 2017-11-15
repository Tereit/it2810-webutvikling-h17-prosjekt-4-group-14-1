import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-top50',
    templateUrl: './top50.component.html',
    styleUrls: ['./top50.component.css']
})

export class Top50Component implements OnInit {
    country: string;
    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.country = this.route.snapshot.paramMap.get('country');
        //this.country$ = this.route.paramMap.switchMap((params: ParamMap) => params.get('country'));
        console.log(this.country);
    }
}
