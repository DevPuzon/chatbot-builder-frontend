import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CustomHttpService } from 'src/app/utils/custom-http.service';
import { ToastMessageService } from 'src/app/utils/toast-message.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {

  form: FormGroup; get f() { return this.form.controls; }
  submitted=false;
  constructor(
    private router:Router, 
    private cusHttp :CustomHttpService,
    private toast:ToastMessageService,
    private loadingController:LoadingController,
    private formBuilder :FormBuilder) { 
    this.form = this.formBuilder.group({
      clientID: ['', [Validators.required,Validators.pattern("^[0-9]*$"),]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(7)]]
    }, { });
  }

  ngOnInit() {}

  imgPass = "eye";
  typePass="password";
  onClickShow(){ 
    this.typePass = this.typePass === 'text' ? 'password' : 'text';
    this.imgPass = this.imgPass === 'eye-off' ? 'eye' : 'eye-off';
  }
  
  async onSubmit(){ 
    console.log(this.form);
    this.submitted = true;
    if(this.form.invalid){
      return;
    } 
    this.onRegister();   
  }  
  
  async onRegister() { 
    var loading = await  this.loadingController.create({ message: "Please wait ...."  });
    await loading.present(); 
    
    this.cusHttp.postNoToken("reg", this.form.value)
    .subscribe(async (snap:any)=>{ 
      await loading.dismiss();   
      this.router.navigateByUrl("auth");
    }, 
    async (err:any) => { 
      console.log(err);
      await loading.dismiss();   
      this.toast.presentToast(err.error.error_message);
    });
  }
}
