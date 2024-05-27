import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {
  #userService = inject(UserService);
  #fb = inject(FormBuilder);
  #router = inject(Router);
  
  // Reactive form group for login form
  public loginForm = this.#fb.group({
    email: ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required ]],
  });
  
  /**
   * Method to handle login.
   * If the form is invalid, it will return immediately.
   * Otherwise, it will call the authenticateUser method from UserService.
   * If the user is authenticated successfully, it will navigate to the 'tasks' route.
   */
  login(): void {
    if (this.loginForm.invalid) return;
    
    const { email, password } = this.loginForm.value;
    
    this.#userService.authenticateUser(email!, password!)
      .subscribe(user => {
        if (!user) return;
        
        this.#router.navigate([ 'tasks' ]);
      });
  }
}
