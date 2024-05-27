import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButton,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  #router = inject(Router);
  #userService = inject(UserService);
  public isTaskPage = signal<boolean>(false);
  
  /**
   * Constructor for NavbarComponent
   * Sets up an effect to navigate to the appropriate page based on `isTaskPage` signal.
   */
  constructor() {
    effect(() => {
      this.#router.navigate(this.isTaskPage() ? ['users'] : ['tasks']);
    });
  }
  
  /**
   * Toggles the value of `isTaskPage` to switch between task and user pages.
   */
  changePage(): void {
    this.isTaskPage.update(value => !value);
  }
  
  /**
   * Logs out the current user and navigates to the login page.
   */
  logout(): void {
    this.#userService.logout();
    this.#router.navigate(['login']);
  }
}
