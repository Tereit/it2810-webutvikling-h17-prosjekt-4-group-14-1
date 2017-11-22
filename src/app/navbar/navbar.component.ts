import {Component} from '@angular/core';
import {MatMenu} from '@angular/material/menu';

/**
 * @title Menu with icons
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public isCollapsed = true;
}
