import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'user/:id',
    loadComponent: () => import('./usermanagement/user-details-view/user-details-view.component').then(m => m.UserDetailsViewComponent)
  },
  {
    path: 'table-view',
    loadComponent: () => import('./usermanagement/user-table-view/user-table-view.component').then(m => m.UserTableViewComponent)
  },
  {
    path: '',
    loadComponent: () => import('./usermanagement/user-table-view/user-table-view.component').then(m => m.UserTableViewComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./no-data-found/no-data-found.component').then(m => m.NoDataFoundComponent)
  }
];
