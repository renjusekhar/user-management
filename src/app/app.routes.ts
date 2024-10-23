import { Routes } from '@angular/router';
import { UserTableViewComponent } from './usermanagement/user-table-view/user-table-view.component';
import { UserDetailsViewComponent } from './usermanagement/user-details-view/user-details-view.component';
import { NoDataFoundComponent } from './no-data-found/no-data-found.component';

export const routes: Routes = [
  { path: 'user/:id', component: UserDetailsViewComponent },
  { path: 'table-view', component: UserTableViewComponent },
  { path: '', component: UserTableViewComponent },
  { path: '**', component: NoDataFoundComponent },
];


