import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { BlockUtils } from 'src/app/utils/block-utils';
import { CryptService } from 'src/app/utils/crypt.service';
import { CustomHttpService } from 'src/app/utils/custom-http.service';
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
    
    this.onLogin();
    // this.submitted = true;
    // if(this.form.invalid){
    //   return;
    // }   
    // this.onLogin();
  } 
  
  async onLogin() { 
    var loading = await  this.loadingController.create({ message: "Please wait ...."  });
    await loading.present(); 
    setTimeout(async () => {
      await loading.dismiss();  
      this.router.navigateByUrl("p"); 
    },2800); 
    return;

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
            this.router.navigateByUrl("p"); 
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

  async signInWithFB(): Promise<void> {
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
      const u_access_token = await FbProcessService.getLongLiveUserAToken(snap.authToken);
      const data = await FbProcessService.getLongLivePageToken(snap.id,u_access_token);
      await FbProcessService.prepPages(data); 
      await this.onSaveFbLogin();
      await loading.dismiss(); 
    }).catch((err)=>{
      console.log(err);
    })
  }

  onSaveFbLogin() {
    return new Promise<any>(resolve=>{

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