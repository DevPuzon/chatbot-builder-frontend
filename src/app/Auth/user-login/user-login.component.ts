import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { CustomHttpService } from 'src/app/utils/custom-http.service';
import { ToastMessageService } from 'src/app/utils/toast-message.service';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  form: FormGroup; get f() { return this.form.controls; }
  submitted=false;
  constructor(private authService: SocialAuthService,
    private router:Router, 
    private cusHttp :CustomHttpService,
    private toast:ToastMessageService,
    private loadingController:LoadingController,
    private formBuilder :FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(7)]]
    }, { });
   }

  ngOnInit() { 
    this.authService.authState.subscribe((user) => { 
    });
  }

  imgPass = "eye";
  typePass="password";
  onClickShow(){  
    this.typePass = this.typePass === 'text' ? 'password' : 'text';
    this.imgPass = this.imgPass === 'eye-off' ? 'eye' : 'eye-off';
  }
  async onSubmit(){  
    this.submitted = true;
    if(this.form.invalid){
      return;
    }   
    this.onLogin();
  } 
  
  async onLogin() { 
    localStorage.clear();
    var loading = await  this.loadingController.create({ message: "Please wait ...."  });
    await loading.present(); 
    
    this.cusHttp.postNoToken("login", this.form.value)
    .subscribe(async (snap:any)=>{ 
      await loading.dismiss();   
      localStorage.setItem("-=[]t",snap.token); 
      setTimeout(() => { 
        this.cusHttp.getUser()
        .then(()=>{
          setTimeout(() => {
            this.router.navigateByUrl("t"); 
          }, 800);
        }).catch(()=>{
          this.toast.presentToast("Something went wrong");
        });
      }, 700);
    }, 
    async (err: Response) => { 
      await loading.dismiss();   
      if(err.status == 401){
        this.toast.presentToast("Email and password doesn't match");
      }else{ 
        this.toast.presentToast("Something went wrong");
      }
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