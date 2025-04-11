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


  isUser = computed(() => {
    const role = this.auth.userRole();
    return role === 'admin' || role === 'owner' || role === 'user';
  });
  
  isPrivilegedUser = computed(() => {
    const role = this.auth.userRole();
    return role === 'admin' || role === 'owner';
  });

  
}