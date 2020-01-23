import { Component, OnInit, Input, NgZone } from '@angular/core';
import { AuthService } from '@shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Hub } from 'aws-amplify';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  logged: boolean;
  constructor(private authService: AuthService,
              private router: Router,
              private ngZone: NgZone) {
  }

  ngOnInit() {
    Hub.listen('auth', ({  payload: { event, data } }) => { 
      switch (event) {
        case 'signIn':
          console.log('signIn');
          this.isUserLogged();
          break;
        case 'signOut':
          console.log('signOut');
          break;
      }
    });
  }

  async isUserLogged(){
    this.logged = await this.authService.isAuthenticated();
    console.log(this.logged);
    if (this.logged) {
      this.ngZone.run(() => this.router.navigate(['audit/products'])).then();
    }
  }

}
