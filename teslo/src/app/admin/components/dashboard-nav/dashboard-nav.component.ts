import { AuthService } from '@/auth/services/auth.service';
import { Component, inject } from '@angular/core';
import { DashboardNavItemComponent } from "../dashboard-nav-item/dashboard-nav-item.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-nav',
  imports: [DashboardNavItemComponent, RouterLink],
  templateUrl: './dashboard-nav.component.html',
})
export class DashboardNavComponent {

  public authService = inject(AuthService)

}
