import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dashboard-nav-item',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './dashboard-nav-item.component.html',
})
export class DashboardNavItemComponent { }
