import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { BlockUtils } from 'src/app/utils/block-utils';
import { CustomHttpService } from 'src/app/utils/custom-http.service';
import { ToastMessageService } from 'src/app/utils/toast-message.service';
import { WmatchingutilsService } from 'src/app/utils/wmatchingutils.service';
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
    var loading = await  this.loadingController.create({ message: "Please wait ...."  });
    await loading.present(); 
    await  BlockUtils.delBlocks();
    await WmatchingutilsService.delWordMatch();
    localStorage.clear();
    
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

  signInWithFB(): void {
    const fbLoginOptions = {
      // scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
      scope:'email,public_profile,pages_show_list,pages_messaging,pages_read_engagement,pages_manage_metadata',
      return_scopes: true,
      enable_profile_selector: true
     }; 
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID,fbLoginOptions ).then((snap)=>{
      console.log(snap);
      this.prepPages(snap.response.id,snap.authToken);
    }).catch((err)=>{
      console.log(err);
    })
  }
  prepPages(user_id,access_token) {
    this.cusHttp.getP(`https://graph.facebook.com/${user_id}/accounts?fields=name,access_token&access_token=${access_token}`)
    .subscribe((snap:any)=>{
      const data = snap.data;
      console.log(data);
      data.forEach(async el => { 
        const data = await new Promise<any>((resolve)=>{
          this.cusHttp.postP(`https://graph.facebook.com/${el.id}/subscribed_apps?subscribed_fields=messages,message_deliveries,messaging_pre_checkouts,messaging_referrals,standby,message_reactions,messaging_postbacks,message_reads,messaging_checkout_updates,message_echoes,messaging_handovers,inbox_labels,messaging_optins,messaging_payments,messaging_account_linking,messaging_game_plays,messaging_policy_enforcement&access_token=${el.access_token}`,{})
          .subscribe((data)=>{
            resolve(data);
          })
        })
        console.log(data);
      });
      console.log("Logging in ...."); 
    });
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