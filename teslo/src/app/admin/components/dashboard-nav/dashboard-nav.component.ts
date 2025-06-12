import { AuthService } from '@/auth/services/auth.service';
import { Component, inject } from '@angular/core';
import { DashboardNavItemComponent } from "../dashboard-nav-item/dashboard-nav-item.component";

@Component({
  selector: 'app-dashboard-nav',
  imports: [DashboardNavItemComponent],
  templateUrl: './dashboard-nav.component.html',
})
export class DashboardNavComponent {

  public authService = inject(AuthService)
}
