import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'user/:id',
    loadComponent: () => import('./user-management/user-details/user-details.component').then(m => m.UserDetailsComponent),
    title: 'User Details'
  },
  {
    path: 'list',
    loadComponent: () => import('./user-management/user-list/user-list.component').then(m => m.UserListComponent),
    title: 'User List'
  },
  {
    path: '',
    loadComponent: () => import('./user-management/user-list/user-list.component').then(m => m.UserListComponent),
    title: 'User List'
  },
  {
    path: '**',
    loadComponent: () => import('./layout/no-data-found/no-data-found.component').then(m => m.NoDataFoundComponent),
    title: '404 Not Found'
  }
];

