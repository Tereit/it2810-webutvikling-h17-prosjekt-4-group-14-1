import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any;
  searchHistory: any = [];

  constructor(public auth: AuthService, private userService: UserService) { }

  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      this.userService.getHistory(this.profile.name).subscribe(data => {
        this.searchHistory = data;
      });
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        this.userService.getHistory(this.profile.name).subscribe(data => {
          this.searchHistory = data;
        });
      });
    }
  }

}
