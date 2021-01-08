import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController, PopoverController } from '@ionic/angular';

declare var $:any;
@Component({
  selector: 'app-exportasfile',
  templateUrl: './exportasfile.component.html',
  styleUrls: ['./exportasfile.component.scss'],
})
export class ExportasfileComponent implements OnInit {
  form: FormGroup; get f() { return this.form.controls; }
  submitted=false;
  constructor(  
    private modalController:ModalController,
    private nav:NavController,
    private formBuilder :FormBuilder) { 
    this.form = this.formBuilder.group({
      profile: ['', [Validators.required ]],
      description: ['', [Validators.required ]],
      createdBy: ['', [Validators.required ]],
      name: ['', [Validators.required ]],
      type: ['', [Validators.required ]],
      msgr_id: ['', [Validators.pattern("^[0-9]*$"),]], 
    }, { 
     }); 
  }

  ngOnInit() {}

  
  onChange(file) {  
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);

    reader.onload = event => {
      this.form.controls['profile'].setValue(reader.result.toString()); 
    };
  }
  async onSubmit(){  
    console.log(this.form.value);
    this.submitted = true;
    if(this.form.invalid){
      return;
    }   
    console.log(this.form.value);
  } 
  getImage(){ 
    $("#exportU").click();
  }
  onBack(){
    this.modalController.dismiss();
  }
}
