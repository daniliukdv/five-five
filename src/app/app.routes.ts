import { Routes } from '@angular/router';

import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
  { path: 'admin', loadComponent: () => AdminComponent },
  { path: '', loadComponent: () => UserComponent },
  { path: '**', loadComponent: () => UserComponent, redirectTo: '' },
  { path: '', redirectTo: '', pathMatch: 'full' },
];
