import { Injectable } from '@angular/core';
import { CustomHttp } from './custom-http.service';

@Injectable({
  providedIn: 'root'
})
export class AutomationFunctionService {
  static custHttp:CustomHttp;
  static project_id:any;
  constructor() {  
  }

   
  static isDone = true; 
  static maindatas = null; 
  static wmatchingdtas  = null; 
  static savingTime(maindatas,wmatchingdtas){
    this.isDone = true;
    this.maindatas = maindatas;
    this.wmatchingdtas = wmatchingdtas;
    setTimeout(() => {
      if(this.isDone && maindatas != null && wmatchingdtas != null){  
        console.log(maindatas);
        console.log(wmatchingdtas);
        this.onSave();
      } 
    }, 10000);
    return;
  }

  static onSave() { 
    if(!this.project_id){return;}
    console.log("OnSave");
    AutomationFunctionService.custHttp.post("debug-automation/deploy?project_id="+this.project_id,{
      blocks:this.maindatas,
      word_matches:this.wmatchingdtas
    }).subscribe(async (snap:any)=>{  
      console.log(snap)
      this.isDone = false;
      console.log("isDone");
    }, (err: any) => {  
      console.log(err); 
    });  
  }
}
