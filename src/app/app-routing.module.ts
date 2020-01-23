import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AuthGuardService as AuthGuard
} from './shared/services/auth/auth-guard.service';
import { AppComponent } from './app.component';
const routes: Routes = [
  {
    path: 'audit',
    loadChildren: () => import('./audit/audit.module').then(m => m.AuditModule),
    canActivate : [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'shared',
    loadChildren: () =>
      import('./shared/shared.module').then(m => m.SharedModule),
      canActivate : [AuthGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./audit/audit.module').then(m => m.AuditModule),
    canActivate : [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
