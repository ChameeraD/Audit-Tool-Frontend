import { Component } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import Amplify, { Auth, Hub} from 'aws-amplify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'auditTool';

  constructor(public amplify: AmplifyService) {
  // Subscribe to IsSignIn and then update the user in NgRxStore
  // Also update the interceptor
  Hub.listen('auth', ({  payload: { event, data } }) => {
    switch (event) {
      case 'signIn':
        console.log('signIn');
        break;
      case 'signOut':
        console.log('signOut');
        break;
    }
  });

}}

