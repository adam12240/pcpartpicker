import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  auth = inject(AuthService);

  // Optional signal alias if you want
  isPrivilegedUser = computed(() => {
    const role = this.auth.userRole();
    return role === 'admin' || role === 'owner';
  });

  isUser = computed(() => {
    const role = this.auth.userRole();
    return role === 'admin' || role === 'owner' || role === 'user';
  })
}