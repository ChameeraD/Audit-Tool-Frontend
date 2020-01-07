import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ngx bootstrap modules import */
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AlertModule } from 'ngx-bootstrap/alert';

/* fontawesome module import */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuditRoutingModule } from './audit-routing.module';
import { AuditComponent } from './audit.component';
import { ViewProductsComponent } from './containers/view-products/view-products.component';
import { ViewPhasesComponent } from './containers/view-phases/view-phases.component';
import { ProductTileComponent } from './components/product-tile/product-tile.component';
import { PhaseTileComponent } from './components/phase-tile/phase-tile.component';
import { ViewQuestionsComponent } from './containers/view-questions/view-questions.component';

@NgModule({
  declarations: [
    AuditComponent,
    ViewProductsComponent,
    ViewPhasesComponent,
    ProductTileComponent,
    PhaseTileComponent,
    ViewQuestionsComponent,
  ],
  imports: [
    CommonModule,
    AuditRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ProgressbarModule.forRoot(),
    ButtonsModule.forRoot(),
    CarouselModule.forRoot(),
    AlertModule.forRoot(),
    FontAwesomeModule,
    HttpClientModule,
    AngularEditorModule,
  ],
})
export class AuditModule {}
