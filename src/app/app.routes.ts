import { Routes } from '@angular/router';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { NoAuthenticatedGuard } from './guards/no-authenticated.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
    canActivate: [ NoAuthenticatedGuard ]
  },
  {
    path: '',
    loadComponent: () => import('./layouts/layout/layout.component'),
    canActivate: [ AuthenticatedGuard ],
    children: [
      {
        path: 'tasks',
        data: { title: 'Tasks' },
        loadComponent: () => import('./pages/tasks/tasks.component'),
        canActivate: [ AuthenticatedGuard ]
      },
      {
        path: 'users',
        data: { title: 'Users' },
        loadComponent: () => import('./pages/users/users.component'),
        canActivate: [ AuthenticatedGuard ]
      },
      {
        path: '',
        redirectTo: '/tasks',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
