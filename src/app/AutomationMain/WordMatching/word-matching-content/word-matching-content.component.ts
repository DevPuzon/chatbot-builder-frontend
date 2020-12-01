import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, PopoverController, ToastController } from '@ionic/angular';
import { CustomHttpService } from 'src/app/utils/custom-http.service';
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
  
  init() {
    console.log(this.maindatas);
    if(WmatchingutilsService.getWordMatch() != null){ 
      this.wmatchingdtas = WmatchingutilsService.getWordMatch();
    }else{
      this.wmatchingdtas.push({user_possible_words:[],commands:[]});
      this.getCloudblocks();
    }
    //WmatchingutilsService.setWordMatch(this.wmatchingdtas,this.maindatas); 
    console.log(this.wmatchingdtas);
    setInterval(()=>{
      WmatchingutilsService.cleanWordMatch(this.wmatchingdtas);
      WmatchingutilsService.setWordMatch(this.wmatchingdtas,this.maindatas);
    },1000);
    this.onInput("");
  }

  async getCloudblocks(){  
    var loading = await  this.loadingController.create({ message: "Please wait ...."  });
    await loading.present();
    
    this.custHttps.get("wordmatch/"+this.user.clientID)
    .subscribe(async (snap:any)=>{ 
      await loading.dismiss();
      snap = snap.response;
      console.log(snap);
      if(!snap){ 
        return;
      } 
      this.wmatchingdtas = snap;
      //WmatchingutilsService.setWordMatch(this.wmatchingdtas,this.maindatas); 
      this.init();
    }, 
    async (errorCode: Response) => { 
      console.log(errorCode) ;
      this.toast.presentToast("Something went wrong please try again later");
      await loading.dismiss();
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
        console.log(id_con);
        $('input[id^='+id_con+'sets]').each(function(){ 
         console.log($(this).context.id);
         sets.push(JSON.parse($(this).val()));
        });
         console.log(sets);
        _this.wmatchingdtas[id_con].commands = sets;
        console.log(_this.wmatchingdtas[id_con]);
        WmatchingutilsService.setWordMatch(_this.wmatchingdtas,this.maindatas); 
        $(".slide-placeholder-animator").remove(); 
      },
     }); 
    }); 
  }

  kWord(word,wm_i,$event){
    if(!word){return;}
    this.wmatchingdtas[wm_i].user_possible_words.push(word);
    //WmatchingutilsService.setWordMatch(this.wmatchingdtas,this.maindatas); 
    console.log($event);
    $event.target.value = "";
  }
  delWord(word_i,wm_i){
    this.wmatchingdtas[wm_i].user_possible_words.splice(word_i, 1);
    //WmatchingutilsService.setWordMatch(this.wmatchingdtas,this.maindatas); 
  }
  onDelComm(comm_i,wm_i){
    this.wmatchingdtas[wm_i].commands.splice(comm_i, 1);
    //WmatchingutilsService.setWordMatch(this.wmatchingdtas,this.maindatas); 
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
    //WmatchingutilsService.setWordMatch(this.wmatchingdtas,this.maindatas); 
  }
  onAddWordM(){
    this.wmatchingdtas.push({user_possible_words:[],commands:[ ]});
    //WmatchingutilsService.setWordMatch(this.wmatchingdtas,this.maindatas); 
  }
  onDelConv(conv_i){
    this.wmatchingdtas.splice(conv_i,1);
    //WmatchingutilsService.setWordMatch(this.wmatchingdtas,this.maindatas); 
  }
  onInput(txt){ 
    this.user_word_bools = new Array();
    if(txt == ""){
      console.log("null");
      for(let i = 0 ; i < this.wmatchingdtas.length ;i ++){
        this.user_word_bools.push(true);
      }
      console.log(this.user_word_bools);
      return;
    }
    let user_words = this.wmatchingdtas.map(o=>o.user_possible_words);
    console.log(user_words.length);   
    for(let i = 0 ; i < user_words.length;i++){
      const user_word = user_words[i];
      for(let j = 0 ; j < user_word.length;j++){
        const word = user_word[j];
        if(word.includes(txt)){
          this.user_word_bools[i] =true;
          j = user_word.length;
        }else{
          this.user_word_bools[i]= false;
        }
      }
    } 
  }
}
