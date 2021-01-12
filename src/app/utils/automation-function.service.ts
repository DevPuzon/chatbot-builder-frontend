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

  
  static saveCount= 1;
  static savingTime(maindatas,wmatchingdtas){
    this.saveCount= 1;
    const inter = setInterval(()=>{
      if(this.saveCount == 0 ){
        clearInterval(inter);
        console.log(maindatas);
        console.log(wmatchingdtas);
        this.onSave(maindatas,wmatchingdtas);
      }
      this.saveCount--;
    },800)
    return;
  }

  static onSave(maindatas,wmatchingdtas) { 
    if(!this.project_id){return;}
    AutomationFunctionService.custHttp.post("debug-automation/deploy?project_id="+this.project_id,{
      blocks:maindatas,
      word_matches:wmatchingdtas
    }).subscribe(async (snap:any)=>{  
      console.log(snap)
    }, (err: any) => {  
      console.log(err); 
    });  
  }
}
