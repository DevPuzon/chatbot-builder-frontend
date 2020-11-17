import { Component, OnInit } from '@angular/core';
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

  wmatchingdtas = new Array();
  constructor(private popoverController:PopoverController,
    private custHttps:CustomHttpService,
    private router:Router,
    private toast : ToastMessageService,
    private loadingController:LoadingController) { }
    user:any;
  async ngOnInit() {
    this.initSortable();
    this.init();
    var loading = await  this.loadingController.create({ message: "Please wait ...."  });
    await loading.present(); 
    this.user = await this.custHttps.getUser();
    loading.dismiss();
    if(!WmatchingutilsService.getWordMatch()){ 
      this.getCloudblocks();
    }
  }

  init() {
    if(WmatchingutilsService.getWordMatch() != null){ 
      this.wmatchingdtas = WmatchingutilsService.getWordMatch();
    }else{
      this.wmatchingdtas.push({user_possible_words:[],commands:[ ]});
    }
    console.log(this.wmatchingdtas);
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
      console.log(snap);
      WmatchingutilsService.setWordMatch(snap); 
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
      cssClass: 'ion-popover',
      event: ev,
      componentProps:{wmatchingdtas_i:wmatchingdtas_i,
        command_i:this.wmatchingdtas[wmatchingdtas_i].commands.length,
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
        WmatchingutilsService.setWordMatch(_this.wmatchingdtas);
        $(".slide-placeholder-animator").remove(); 
      },
     }); 
    }); 
  }

  kWord(word,wm_i,$event){
    if(!word){return;}
    this.wmatchingdtas[wm_i].user_possible_words.push(word);
    WmatchingutilsService.setWordMatch(this.wmatchingdtas);
    console.log($event);
    $event.target.value = "";
  }
  delWord(word_i,wm_i){
    this.wmatchingdtas[wm_i].user_possible_words.splice(word_i, 1);
    WmatchingutilsService.setWordMatch(this.wmatchingdtas);
  }
  onDelComm(comm_i,wm_i){
    this.wmatchingdtas[wm_i].commands.splice(comm_i, 1);
    WmatchingutilsService.setWordMatch(this.wmatchingdtas);
  }
  onAddWordM(){
    this.wmatchingdtas.push({user_possible_words:[],commands:[ ]});
    WmatchingutilsService.setWordMatch(this.wmatchingdtas);
  }
  onDelConv(conv_i){
    this.wmatchingdtas.splice(conv_i,1);
    WmatchingutilsService.setWordMatch(this.wmatchingdtas);
  }
}
