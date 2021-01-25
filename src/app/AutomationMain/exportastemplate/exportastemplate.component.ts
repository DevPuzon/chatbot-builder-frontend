import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController, NavController, PopoverController } from '@ionic/angular';
import { BlobService } from 'src/app/utils/blob.service';
import { CustomHttp } from 'src/app/utils/custom-http.service';
import { ToastMessageService } from 'src/app/utils/toast-message.service';
import { UploadtostService } from 'src/app/utils/uploadtost.service';
import { UuidService } from 'src/app/utils/uuid.service';

declare var $:any;
@Component({
  selector: 'app-exportastemplate',
  templateUrl: './exportastemplate.component.html',
  styleUrls: ['./exportastemplate.component.scss'],
})
export class ExportastemplateComponent implements OnInit {
  @Input() project_id: any;
  @Input() template_id: any;
  
  form: FormGroup; get f() { return this.form.controls; }
  isProgressLoading = false;
  submitted=false;
  constructor(  
    private modalController:ModalController,
    private nav:NavController,
    private loadingController:LoadingController,
    private route :ActivatedRoute,
    private toast:ToastMessageService,
    private cusHttp:CustomHttp,
    private router : Router,
    private formBuilder :FormBuilder) { 
    this.form = this.formBuilder.group({
      temp_img: ['', [Validators.required ]],
      description: ['', [Validators.required ]],
      created_by: ['', [Validators.required ]],
      name: ['', [Validators.required ]],
      type: ['', [Validators.required ]],
      is_public: [false], 
    }, { 
     }); 
  }

  ngOnInit() { 
    if(this.template_id != null){
      this.isProgressLoading = true;
      this.cusHttp.get(`template/?project_id=${this.project_id}&template_id=${this.template_id}`)
      .subscribe((snap:any)=>{
        if(!snap){
          window.location.reload();
        }
        this.isProgressLoading = false;
        this.form.patchValue(snap);
      },err=>{
        this.toast.presentToast(this.cusHttp.httpErrRes(err));
      })
    }
  }

  
  onChange(files) {  
    const file =files[0];
    if(file){  
      BlobService.resize(file,440).then(async (data)=>{   
        const file = await BlobService.bitmapToBlob(data);  
        const uploaded_file = await UploadtostService.uploadFile(file,'template_profile/'+UuidService.makeid(12)); 
        this.form.patchValue({temp_img:uploaded_file.Location}); 
      }); 
    }
  }
  async onSubmit(){  
    console.log(this.form.value);
    this.submitted = true;
    if(this.form.invalid){
      return;
    }   

    var loading = await  this.loadingController.create({ message: "Please wait ...."  });
    await loading.present(); 
    if(this.template_id == null){
      //EXPORT ==============
      const data =  this.form.value;
      Object.assign(data,{
        project_id:this.project_id
      })
      
      this.cusHttp.post('template/?project_id='+this.project_id,data)
      .subscribe((snap)=>{
        console.log(snap);
        loading.dismiss();
        this.toast.presentToast("Exported successfully");
        this.onBack(); 
        this.router.navigate([], { relativeTo: this.route,queryParams:snap });
      },err =>{
        loading.dismiss();
        this.toast.presentToast(this.cusHttp.httpErrRes(err))
      })
    }else{
      // UPDATE===========
      const data =  this.form.value;  
      this.cusHttp.put(`template/?template_id=${this.template_id}&project_id=${this.project_id}`,data)
      .subscribe((snap)=>{
        console.log(snap);
        loading.dismiss();
        this.toast.presentToast("Updated successfully");
        this.onBack();
        this.router.navigate([], { relativeTo: this.route,queryParams:snap });
      },err =>{
        loading.dismiss();
        this.toast.presentToast(this.cusHttp.httpErrRes(err))
      })
    }
  } 
  getImage(){ 
    $("#exportU").click();
  }
  onBack(){
    this.modalController.dismiss();
  }
}
