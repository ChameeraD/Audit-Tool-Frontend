import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuditComponent } from './audit.component';
import { ViewProductsComponent } from './containers/view-products/view-products.component';
import { ViewPhasesComponent } from './containers/view-phases/view-phases.component';
import { ViewQuestionsComponent } from './containers/view-questions/view-questions.component';

const routes: Routes = [
  { path: 'products', component: ViewProductsComponent },
  { path: 'products/:productId/phases', component: ViewPhasesComponent },
  {
    path:
      'products/:productId/phases/:productPhaseId/knowledgeAreas/:knowledgeAreaId/question',
    component: ViewQuestionsComponent,
  },
  { path: '**', component: ViewProductsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditRoutingModule {}
