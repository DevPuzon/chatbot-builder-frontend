import { Component, OnInit } from '@angular/core';

import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {

  constructor(private authService: SocialAuthService) { }

  ngOnInit() { 
    this.authService.authState.subscribe((user) => {
      console.log(user);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {const fbLoginOptions = {
    scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
    return_scopes: true,
    enable_profile_selector: true
  };
    console.log("signInWithFB");
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

}






//reference https://developers.facebook.com/apps/3443378839110052/app-review/permissions/
// https://developers.facebook.com/docs/pages/getting-started
// https://developers.facebook.com/docs/pages/access-tokens
// https://developers.facebook.com/docs/pages/overview#permissions
// https://developers.facebook.com/docs/facebook-login/access-tokens/refreshing#generate-long-lived-token
// https://developers.facebook.com/docs/facebook-login/access-tokens#pagetokens