import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

export const AuthenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);
  
  // Check if the user session is valid
  if (!userService.isSessionValid()) {
    // If not valid, log out the user and navigate to the login page
    userService.logout();
    return router.navigate([ '/login' ]);
  }
  
  // If the session is valid, allow access to the route
  return true;
};
