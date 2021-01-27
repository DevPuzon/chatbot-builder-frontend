import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { CookieService } from 'ngx-cookie-service';
import { BlockUtils } from 'src/app/utils/block-utils';
import { CryptService } from 'src/app/utils/crypt.service';
import { CustomHttp } from 'src/app/utils/custom-http.service';
import { FbProcessService } from 'src/app/utils/fb-process.service';
import { ToastMessageService } from 'src/app/utils/toast-message.service';
import { UuidService } from 'src/app/utils/uuid.service';
import { WmatchingutilsService } from 'src/app/utils/wmatchingutils.service';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit { 
  check_privacy = false;
  form: FormGroup; get f() { return this.form.controls; }
  submitted=false;
  submitted_fb=false;
  constructor(private authService: SocialAuthService,
    private router:Router, 
    private cookieService :CookieService,
    private cusHttp :CustomHttp,
    private toast:ToastMessageService,
    private loadingController:LoadingController,
    private formBuilder :FormBuilder) {
      this.form = this.formBuilder.group({
        email: ['', [Validators.required,Validators.email]],
        password: ['', [Validators.required,Validators.minLength(7)]]
      }, { });
   }

  ngOnInit() {  
    console.log("ngOnInit");
    this.authService.authState.subscribe((user) => { 
      console.log(user);
      console.log("authService");
    });
  }

  imgPass = "eye";
  typePass="password";
  onClickShow(){  
    this.typePass = this.typePass === 'text' ? 'password' : 'text';
    this.imgPass = this.imgPass === 'eye-off' ? 'eye' : 'eye-off';
  }
  async onSubmit(){    
    this.submitted_fb = false; 
    this.submitted = true;
    if(this.form.invalid || !this.check_privacy){
      return;
    }   
    this.onLogin();
  } 
  
  async onLogin() { 
    var loading = await  this.loadingController.create({ message: "Please wait ...."  });
    await loading.present();  
 
    localStorage.clear();
    const data = {
      email:this.form.value.email,
      password:CryptService.encryptData(this.form.value.password)
    }
    console.log(CryptService.decryptData(data.password));
    this.cusHttp.postNoToken("user/email-login", data)
    .subscribe(async (snap:any)=>{ 
      localStorage.setItem('-=[]t',snap.token);
      setTimeout(async () => { 
        await loading.dismiss();   
        console.log(snap);
        this.router.navigateByUrl("p"); 
      }, 800); 
    },  async (err) => { 
      await loading.dismiss(); 
      this.toast.presentToast(this.cusHttp.httpErrRes(err));
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  async signInWithFB()  {
    this.submitted_fb = true;
    this.submitted = false;
    if(this.submitted_fb && !this.check_privacy){
      return;
    }
    var loading = await  this.loadingController.create({ message: "Please wait ...."  });
    await loading.present(); 
    const fbLoginOptions = {
      // scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
      scope:'email,public_profile,pages_show_list,pages_messaging,pages_read_engagement,pages_manage_metadata',
      return_scopes: true,
      enable_profile_selector: true
     }; 
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID,fbLoginOptions ).then(async (snap)=>{
      console.log(snap);
      FbProcessService.stat_cusHttp = this.cusHttp; 
      const u_long_access_token = await FbProcessService.getLongLiveUserAToken(snap.authToken);
      const data = await FbProcessService.getLongLivePageToken(snap.id,u_long_access_token);
      const prep_data = await FbProcessService.prepPages(data);
      const fb_data = await this.onSaveFbLogin(snap,u_long_access_token); 
      await FbProcessService.setFbPageAccessToken(prep_data);
      await loading.dismiss();  
      console.log(prep_data);
      
      if(fb_data.is_not_complete){
        this.router.navigateByUrl('/auth/register/next-proceed/'+fb_data.user_id);
      }else{
        this.router.navigateByUrl('p');
      }
    })
    .catch(async (err)=>{
      await loading.dismiss(); 
      console.log(err);
    })
  }

  onSaveFbLogin(basicInfo,u_long_access_token) {
    return new Promise<any>((resolve,reject)=>{
      const data = {
        email:basicInfo.email,
        password:'',
        first_name:basicInfo.firstName,
        last_name:basicInfo.lastName,  
        provider:'facebook',
        social_user_id :basicInfo.id,
        user_img :basicInfo.photoUrl,
        fb_user_access_token:u_long_access_token,
        is_email_verified: true
      } 
      this.cusHttp.post('user/fb-login',data)
      .subscribe((snap:any)=>{
        localStorage.setItem('-=[]t',snap.token);
        console.log(snap);
        resolve(snap);
      } , async (err) => { 
        reject({});
        this.toast.presentToast(this.cusHttp.httpErrRes(err));
      });
    });
  }

  signOut(): void {
    this.authService.signOut();
  }

  onGuest(){
    const id = UuidService.makeid(6);
    localStorage.setItem('-=[],.g',CryptService.encryptData(id));
    this.router.navigateByUrl("/t/guest");
  }

  @Input() isConnectAcc :any;
  @Output() isPathLogin: EventEmitter<any> = new EventEmitter();
  noAccount(){
    if(!this.isConnectAcc){
      this.router.navigateByUrl('auth/register');
    }else{ 
      this.isPathLogin.emit();
    }
  } 
  
}






//reference https://developers.facebook.com/apps/3443378839110052/app-review/permissions/
// https://developers.facebook.com/docs/pages/getting-started
// https://developers.facebook.com/docs/pages/access-tokens
// https://developers.facebook.com/docs/pages/overview#permissions
// https://developers.facebook.com/docs/facebook-login/access-tokens/refreshing#generate-long-lived-token
// https://developers.facebook.com/docs/facebook-login/access-tokens#pagetokens