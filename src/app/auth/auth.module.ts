import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { AmplifyService, AmplifyAngularModule } from 'aws-amplify-angular';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, AuthRoutingModule, AmplifyAngularModule],
  providers: [AmplifyService],
})
export class AuthModule {}
