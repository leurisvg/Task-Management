import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

export const NoAuthenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);
  
  // Check if the user session is valid
  if (userService.isSessionValid()) {
    // If the session is valid, navigate to the task page
    return router.navigate([ '/tasks' ]);
  }
  
  // If the session is valid, allow access to the route
  return true;
};
