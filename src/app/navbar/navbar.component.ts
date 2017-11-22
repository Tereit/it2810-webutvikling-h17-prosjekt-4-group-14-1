import {Component, OnInit} from '@angular/core';
import {MatMenu} from '@angular/material/menu';
import { AuthService } from '../services/auth.service';

/**
 * @title Menu with icons
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthService]
})
export class NavbarComponent implements OnInit{
  public isCollapsed = true;
  constructor(public auth: AuthService){}

  ngOnInit(){
  }
}
