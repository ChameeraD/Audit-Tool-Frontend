import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AuthGuardService as AuthGuard
} from '../shared/services/auth/auth-guard.service';

import { ViewProductsComponent } from './containers/view-products/view-products.component';
import { ViewPhasesComponent } from './containers/view-phases/view-phases.component';
import { ViewQuestionsComponent } from './containers/view-questions/view-questions.component';

const routes: Routes = [
  {
    path: 'products',
    component: ViewProductsComponent,
  },
  {
    path: 'products/:productId/phases',
    component: ViewPhasesComponent,
    canActivate : [AuthGuard]
  },
  {
    path:
      'products/:productId/phases/:productPhaseId/knowledgeAreas/:knowledgeAreaId/question',
    component: ViewQuestionsComponent,
    canActivate : [AuthGuard]
  },
  { path: '**',
  component: ViewProductsComponent,
  canActivate : [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditRoutingModule {}
