import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { BlobService } from 'src/app/utils/blob.service';
import { CustomHttp } from 'src/app/utils/custom-http.service';
import { ToastMessageService } from 'src/app/utils/toast-message.service';
import { UploadtostService } from 'src/app/utils/uploadtost.service';

declare var $:any;
@Component({
  selector: 'app-exportasfile',
  templateUrl: './exportasfile.component.html',
  styleUrls: ['./exportasfile.component.scss'],
})
export class ExportasfileComponent implements OnInit {
  @Input() project_id: any;
  
  form: FormGroup; get f() { return this.form.controls; }
  submitted=false;
  constructor(  
    private modalController:ModalController,
    private nav:NavController,
    private toast:ToastMessageService,
    private cusHttp:CustomHttp,
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

  }

  
  onChange(files) {  
    const file =files[0];
    if(file){  
      BlobService.resize(file,440).then(async (data)=>{   
        const file = await BlobService.bitmapToBlob(data);  
        const uploaded_file = await UploadtostService.uploadFile(file,'template_profile/'+this.project_id); 
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
    const data =  this.form.value;
    Object.assign(data,{
      project_id:this.project_id
    })
    // console.log(this.form.value);
    this.cusHttp.post('template/export?project_id='+this.project_id,data)
    .subscribe((snap)=>{
      console.log(snap);
      this.toast.presentToast("Successfully exported.");
    },err =>{
      this.toast.presentToast(this.cusHttp.httpErrRes(err))
    })
  } 
  getImage(){ 
    $("#exportU").click();
  }
  onBack(){
    this.modalController.dismiss();
  }
}
