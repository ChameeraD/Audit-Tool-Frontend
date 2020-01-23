import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AmplifyService } from 'aws-amplify-angular';


@Injectable()
export class AuthService {
  token: any;
  logged: Promise<boolean>;

  constructor(public jwtHelper: JwtHelperService,
              public amplify: AmplifyService) {
  }

  public async isAuthenticated() {
    try {
      const session = await Auth.currentSession();
      this.token = session.getAccessToken().getJwtToken();
      if (!this.jwtHelper.isTokenExpired(this.token)) {
       return true;
     } else {
       return false;
     }
    } catch ( err ) {
      console.log(err);
      return false;
    }
  }
  public getCurrentUser() {
    Auth.currentAuthenticatedUser({
      bypassCache: false
  }).then(user => console.log(user))
  .catch(err => console.log(err));
  }
}
