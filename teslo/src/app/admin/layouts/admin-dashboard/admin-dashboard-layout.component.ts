import { Component } from '@angular/core';
import { DashboardNavComponent } from "../../components/dashboard-nav/dashboard-nav.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard-layout',
  imports: [DashboardNavComponent, RouterOutlet],
  templateUrl: './admin-dashboard-layout.component.html',
})
export class AdminDashboardLayoutComponent { }
