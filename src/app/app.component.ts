import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task-management';
  userService = inject(UserService);
  
  /**
   * Invokes the init function to load user data on application startup.
   */
  constructor() {
    this.init();
  }
  
  init() {
    this.userService.loadUser();
  }
}
