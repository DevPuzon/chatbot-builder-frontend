import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, PopoverController, ToastController } from '@ionic/angular';
import { CustomHttpService } from 'src/app/utils/custom-http.service';
import { LoggerUtil } from 'src/app/utils/logger-util';
import { ToastMessageService } from 'src/app/utils/toast-message.service';
import { WmatchingutilsService } from 'src/app/utils/wmatchingutils.service';
import { WmPropertiesComponent } from '../wm-properties/wm-properties.component';  
 
declare var $:any;
@Component({
  selector: 'app-word-matching-content',
  templateUrl: './word-matching-content.component.html',
  styleUrls: ['./word-matching-content.component.scss'],
})
export class WordMatchingContentComponent implements OnInit {

  @Input() maindatas = new Array();
  @Input() wmatchingdtas = new Array();
  user_word_bools = new Array();
  constructor(private popoverController:PopoverController,
    private custHttps:CustomHttpService,
    private router:Router,
    private toast : ToastMessageService,
    private loadingController:LoadingController) { }
    user:any;
  async ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("-==0us"));
    this.initSortable();
    this.init();
    var loading = await  this.loadingController.create({ message: "Please wait ...."  });
    await loading.present(); 
    loading.dismiss();  
  }   
  
  async init() { 
    const localwordmatch =await WmatchingutilsService.getWordMatch();
    if(localwordmatch != null){ 
      this.wmatchingdtas =  localwordmatch;
    }else{ 
      this.wmatchingdtas.push({user_possible_words:[],commands:[]});  
    }
    WmatchingutilsService.setWordMatch(this.wmatchingdtas,this.maindatas); 
    this.onSearch(""); 
    // setInterval(()=>{
    //   WmatchingutilsService.cleanWordMatch(this.wmatchingdtas);
    //   WmatchingutilsService.setWordMatch(this.wmatchingdtas,this.maindatas);
    // },3000);
  } 
  async getCloudblocks(){  
     //WORDMATCH
     this.custHttps.get("wordmatch/"+this.user.clientID)
     .subscribe(async (snap:any)=>{  
       snap = snap.response; 
       if(!snap){ 
         return;
       } 
       this.wmatchingdtas = snap; 
       WmatchingutilsService.setWordMatch(this.wmatchingdtas,this.maindatas);
       this.onSearch(""); 
     }, 
     async (errorCode: Response) => {  
       this.toast.presentToast("Something went wrong please try again later"); 
       setTimeout(() => { 
         this.router.navigateByUrl("/");
       }, 1800);
     }); 
  }
  async onSCommand(ev,wmatchingdtas_i){
    const popover = await this.popoverController.create({
      component: WmPropertiesComponent , 
      cssClass: 'contact-popover',
      event: ev,
      componentProps:{wmatchingdtas_i:wmatchingdtas_i,
        command_i:this.wmatchingdtas[wmatchingdtas_i].commands.length,
        maindatas:this.maindatas,
        wmatchingdtas:this.wmatchingdtas}
    });
    return await popover.present();
  }
  initSortable() { 
    let _this = this;
    $( document ).ready(function() {
      
    $(".wm-slides-sub-arrange").sortable({ 
      stop: function(e, ui) {
        var data = "";
        let id_con =$(this).context.id;
        id_con = id_con.substring(0,1);
        var sets = [];       
        $('input[id^='+id_con+'sets]').each(function(){  
         sets.push(JSON.parse($(this).val()));
        }); 
        _this.wmatchingdtas[id_con].commands = sets; 
        WmatchingutilsService.setWordMatch(_this.wmatchingdtas,this.maindatas); 
        $(".slide-placeholder-animator").remove(); 
      },
     }); 
    }); 
  }

  kWord(word,wm_i,$event){
    if(!word){return;}
    this.wmatchingdtas[wm_i].user_possible_words.push(word);
    WmatchingutilsService.setWordMatch(this.wmatchingdtas,this.maindatas);  
    $event.target.value = "";
  }
  delWord(word_i,wm_i){
    this.wmatchingdtas[wm_i].user_possible_words.splice(word_i, 1);
    WmatchingutilsService.setWordMatch(this.wmatchingdtas,this.maindatas); 
  }
  onDelComm(comm_i,wm_i){
    this.wmatchingdtas[wm_i].commands.splice(comm_i, 1);
    WmatchingutilsService.setWordMatch(this.wmatchingdtas,this.maindatas); 
  }
  async onEditComm(ev,comm_i,wm_i,txt_message){ 
    const popover = await this.popoverController.create({
      component: WmPropertiesComponent ,
      cssClass: 'contact-popover',
      event: ev,
      componentProps:{wmatchingdtas_i:wm_i,
        command_i:comm_i,txt_message:txt_message,
        maindatas:this.maindatas,
        wmatchingdtas:this.wmatchingdtas}
    });
    return await popover.present();
    WmatchingutilsService.setWordMatch(this.wmatchingdtas,this.maindatas); 
  }
  onAddWordM(){ 
    this.wmatchingdtas.push({user_possible_words:[],commands:[ ]});
    WmatchingutilsService.setWordMatch(this.wmatchingdtas,this.maindatas); 
    this.onSearch("");
  }
  onDelConv(conv_i){
    this.wmatchingdtas.splice(conv_i,1);
    WmatchingutilsService.setWordMatch(this.wmatchingdtas,this.maindatas); 
  }
  onSearch(txt){ 
    this.user_word_bools = new Array();
    if(txt == ""){ 
      for(let i = 0 ; i < this.wmatchingdtas.length ;i ++){
        this.user_word_bools.push(true);
      } 
      return;
    }
    let user_words = this.wmatchingdtas.map(o=>o.user_possible_words); 
    for(let i = 0 ; i < user_words.length;i++){
      const user_word = user_words[i];
      for(let j = 0 ; j < user_word.length;j++){
        let word = user_word[j];
        word = word.toLowerCase();
        txt = txt.toLowerCase();
        if(word.includes(txt)){
          this.user_word_bools[i] =true;
          j = user_word.length;
        }else{
          this.user_word_bools[i]= false;
        }
      }
    } 
      
    LoggerUtil.log(this.user_word_bools);
  }
}
