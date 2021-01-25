
import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { AddTextButtonPopupComponent } from '../add-text-button-popup/add-text-button-popup.component'; 
import { BlockUtils } from 'src/app/utils/block-utils';
import { UuidService } from 'src/app/utils/uuid.service';
import { ToastMessageService } from 'src/app/utils/toast-message.service';
import { CustomHttp } from 'src/app/utils/custom-http.service';
import { ChatbotFunc } from 'src/app/utils/chatbot-func';
import { WmatchingutilsService } from 'src/app/utils/wmatchingutils.service';
import { BlobService } from 'src/app/utils/blob.service';
import { AddQuickreplyComponent } from '../add-quickreply/add-quickreply.component';
import { AddCarButtonComponent } from '../add-car-button/add-car-button.component';
import { AuthGuardService } from 'src/app/Auth/auth-guard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddCbackResponseComponent } from '../add-cback-response/add-cback-response.component';
import { EditStopChatlLiveComponent } from '../edit-stop-chatl-live/edit-stop-chatl-live.component';
import { UploadtostService } from 'src/app/utils/uploadtost.service'; 
import { WordMatchingContentComponent } from '../WordMatching/word-matching-content/word-matching-content.component';
import { LoggerUtil } from 'src/app/utils/logger-util';
import { IndexedDBAngular } from 'indexeddb-angular'; 
import { FacebookService, InitParams } from 'ngx-facebook';
import { MenuAutomateComponent } from '../menu-automate/menu-automate.component';
import { CryptService } from 'src/app/utils/crypt.service';
import { SplashScreenController } from 'src/app/InteractivePackage/splash-screen/splash-screen.component';
import { AutomationFunctionService } from 'src/app/utils/automation-function.service';
declare var $:any;
@Component({
  selector: 'app-automation',
  templateUrl: './automation.component.html',
  styleUrls: ['./automation.component.scss'] 
})
export class AutomationComponent implements OnInit { 
  @ViewChild('wordmatching') wordmatching : WordMatchingContentComponent;
  block_index= 0; 
  btntxt_index = null;
  text=""
  maindatas = new Array();
  block :any; 
  showEmojiPickers = new Array(); 
  wmatchingdtas = new Array();  
  search_blocks = new Array(); 
  delay = 3000;
  projectData = {
    fb_page_id: null,
    fbpage_id: null,
    fbpage_img: null,
    fbpage_name: null,
    name: null,
    proj_img: null,
    project_id: null,
    template_id: null,
    updated_at: null,
    user_id: null
  }
  constructor(private popoverController:PopoverController,
    private toast:ToastMessageService,
    private facebookService: FacebookService, 
    private router :Router,
    private route :ActivatedRoute,
    private alertController:AlertController,
    private storage :AngularFireStorage,  
    private splCtrl:SplashScreenController,
    private loadingController:LoadingController,
    private custHttps:CustomHttp) { 
      this.route.queryParams.subscribe((params:any) => {
        this.projectData = params;
        AutomationFunctionService.project_id = this.projectData.project_id;
      }); 
      AutomationFunctionService.custHttp = this.custHttps;
      this.initMaindatas();
  }   
  
  guestID:any;
  async ngOnInit() {     
    this.initSortable();
    this.init();   
    this.initFacebookService(); 
    if(window.location.href.includes('guest')){
      this.guestID = CryptService.decryptData(localStorage.getItem('-=[],.g'));
      console.log(this.guestID);
      if(this.guestID == null){
        this.toast.presentToast("Something went wrong");
        setTimeout(() => {
          localStorage.removeItem('-=[],.g');
          this.router.navigateByUrl("/");
        }, 1000);
      }
    }
    // setInterval(()=>{
    //   BlockUtils.setLocalBlocks(this.maindatas,this.wmatchingdtas);  
    //   WmatchingutilsService.cleanWordMatch(this.wmatchingdtas);
    //   WmatchingutilsService.setWordMatch(this.wmatchingdtas,this.maindatas);
    // }, this.delay);
  }  
  private initFacebookService(): void {
    const initParams: InitParams = { xfbml:true, version:'v3.2'};
    console.log(initParams);
    this.facebookService.init(initParams);
  }
  async onMenu(ev){ 
    const popover = await this.popoverController.create({
      component: MenuAutomateComponent ,  
      event: ev ,
      componentProps:{
        template_id:this.projectData.template_id,
        project_id:this.projectData.project_id
      }
    });
    await popover.present(); 
  }
  copyTestCode(){ 
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '90px';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value ="QWED";
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy'); 
    
    this.toast.presentToast('Copied.'); 
  }
 
  isShowMinBlock = true;
  checkIsShowMinBlock() {
    const mini_blocks = this.maindatas[this.block_index].mini_blocks;  
    let isShow = mini_blocks.findIndex(o => o.type === 'cback-only'); 
    let isLChatShow = mini_blocks.findIndex(o => o.type === 'livechat-only');
    if(isShow != -1 || isLChatShow != -1){
      this.isShowMinBlock = false;
    }else{
      this.isShowMinBlock = true;
    } 
  } 

  onNavMinblock(i){
    var elmnt = document.getElementById("min_block_"+i) ; 
    elmnt.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  
  onSearch(txt){ 
    this.search_blocks = new Array();
    if(txt == ""){ 
      for(let i = 0 ; i < this.maindatas.length ;i ++){
        this.search_blocks.push(true);
      } 
      return;
    }
    for(let i = 0 ; i < this.maindatas.length ;i ++){
      const block_name = this.maindatas[i].block_name.toLowerCase();
      if(block_name.includes(txt.toLowerCase())){
        this.search_blocks.push(true);
      }else{
        this.search_blocks.push(false);
      }
    }  
    LoggerUtil.log(this.search_blocks);
  }
  initSortable() { 
    let _this = this;
    $(".slides-sub-arrange").sortable({ 
     stop: function(e, ui) {
      var data = ""; 
        var sets = [];            
        $('input[id^=subsets]').each(function(){
          sets.push(JSON.parse($(this).val()));
        });
        const mini_blocks = _this.maindatas[_this.block_index].mini_blocks;
        for(let i = 0 ; i < mini_blocks.length ; i++){
          if(sets[i]){
           mini_blocks[i] = sets[i]; 
          }
        }
       //  _this.maindatas[_this.block_index].mini_blocks = sets; 
        BlockUtils.setLocalBlocks(_this.maindatas,_this.wmatchingdtas); 
        $(".slide-placeholder-animator").remove(); 
     },
    });
    
    $(".slides-main-arrange").sortable({ 
      stop: function(e, ui) {
       var data = ""; 
         var sets = [];            
         $('input[id^=mainsets]').each(function(){
           sets.push(JSON.parse($(this).val()));
         }); 
         const mini_blocks = _this.maindatas[_this.block_index].mini_blocks;
         for(let i = 0 ; i < mini_blocks.length ; i++){
           if(sets[i]){
            mini_blocks[i] = sets[i]; 
           }
         }
        //  _this.maindatas[_this.block_index].mini_blocks = sets; 
        BlockUtils.setLocalBlocks(_this.maindatas,_this.wmatchingdtas); 
         $(".slide-placeholder-animator").remove(); 
      },
     });
  }

  async init() {  
    this.getCloudblocks();

    this.checkIsShowMinBlock(); 
    this.initEmoji();
  } 

  initEmoji(){
    for(let i = 0 ; i < this.maindatas[this.block_index].mini_blocks.length;i++){
      this.showEmojiPickers[i] = false;
    }
  }

  // getCVersion() { 
  //   this.splCtrl.show();
  //   this.custHttps.get("automation/get-project-version/?project_id="+this.projectData.project_id)
  //   .subscribe((snap:any)=>{
  //     this.splCtrl.dismiss();
  //     console.log(snap);
  //     if(!snap){
  //       return;
  //     }
  //     const version = snap.current_version;
  //     const localversion = localStorage.getItem("debug_version");
  //     if(version != localversion){
  //       localStorage.setItem("debug_version",version);
  //       this.getCloudblocks();  
  //     }
  //   },err=>{ 
  //     console.log(err); 
  //     // this.toast.presentToast(this.custHttps.httpErrRes(err));
  //   })
  // }

  async initMaindatas() { 
    this.wmatchingdtas.push({user_possible_words:[],commands:[]});  
    this.maindatas.push(
      {
        "block_name":"Welcome message",
        "mini_blocks":[ 
          ChatbotFunc.genText(`Hi, {{first name}}first_name}! {{last name}}last_name}! Nice to meet you.\n \t \tYou successfully connected your bot created on https://retailgate.chatbotbuilder.com to your page.`)
          ]
      }
    )
    this.maindatas.push(
      {
        "block_name":"Default message",
        "mini_blocks":[ 
          ChatbotFunc.genText(`This block is trying to understand the user response.`)
          ]
      }
    )
    this.block = this.maindatas[0];
    this.onSearch(""); 
    this.checkIsShowMinBlock();  
  }

  async addBlock(){
    this.maindatas.push(
      {
        "block_name":this.maindatas.length+". Block",
        "mini_blocks":[ 
          ChatbotFunc.genText("What do you want to do next?")
          ]
      }
    ) 
    BlockUtils.setLocalBlocks(this.maindatas,this.wmatchingdtas);  
    BlockUtils.addcleanBlocks(this.maindatas);
    // this.wmatchingdtas =await WmatchingutilsService.pureGetWordMatch();
    WmatchingutilsService.addcleanWordMatch(this.wmatchingdtas,this.maindatas); 
    this.onSearch("");
  } 
  
  onBlocks(block,i){
    this.block = block; 
    this.block_index = i; 
    this.checkIsShowMinBlock();
    this.initEmoji();
    BlockUtils.setLocalBlocks(this.maindatas,this.wmatchingdtas);  
  }

  async onDelBlock(block_i){ 
    const alert = await this.alertController.create({ 
      header: 'Delete',
      message: 'Do you want to <strong>delete</strong>?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => { 
          }
        }, {
          text: 'Yes',
          handler: async () => {  
            this.maindatas.splice(block_i,1);
            this.onBlocks(this.maindatas[0], 0);
            await BlockUtils.setLocalBlocks(this.maindatas,this.wmatchingdtas); 

            BlockUtils.cleanBlocks(this.maindatas);
            // this.wmatchingdtas =await WmatchingutilsService.pureGetWordMatch();
            WmatchingutilsService.cleanWordMatch(this.wmatchingdtas,this.maindatas); 
            this.onSearch("");
          }
        }
      ]
    }); 
    await alert.present(); 
    
  }

  onEmojiPicker(i) { 
    this.showEmojiPickers[i] = !this.showEmojiPickers[i]; 
  }

  addEmojiTextBtnOnly(event,txt,min_block,mini_block_i) { 
    let message =txt; 
    const text = `${message}${event.emoji.native}`;  
    this.kTitleTxt(text,min_block,mini_block_i);
    // this.showEmojiPicker = false;
  } 
  kTitleTxt(txt,min_block,mini_block_i){ 
    if(min_block.type == 'text-only'){
      this.maindatas[this.block_index].mini_blocks[mini_block_i].message.text = txt;
    }else{
      this.maindatas[this.block_index].mini_blocks[mini_block_i].message.attachment.payload.text = txt;
    } 
    BlockUtils.setLocalBlocks(this.maindatas,this.wmatchingdtas);  
  }  

  async kFocusOTitle(block_name){ 
    this.maindatas[this.block_index].block_name = block_name; 
    BlockUtils.setLocalBlocks(this.maindatas,this.wmatchingdtas);  
    
    BlockUtils.cleanBlocks(this.maindatas);
    // this.wmatchingdtas =await WmatchingutilsService.pureGetWordMatch();
    WmatchingutilsService.cleanWordMatch(this.wmatchingdtas,this.maindatas); 
  } 

  kCarTxt(title,subtitle,url,elements_i,mini_block_i){
    let element = 
    this.maindatas[this.block_index].mini_blocks[mini_block_i]
    .message.attachment.payload.elements[elements_i];
    if(title!=''){
      element.title = title;
    }if(subtitle!=''){
      element.subtitle = subtitle;
    }if(url!=''){
      let defurl ={
          type: "web_url",
          url: url, 
          webview_height_ratio: "tall"
        }
      element.default_action = defurl;
    }
    BlockUtils.setLocalBlocks(this.maindatas,this.wmatchingdtas);  
  } 
  
  async onDeploy(){ 
    const alert = await this.alertController.create({ 
      header: 'Deploy',
      message: 'Do you want to <strong>deploy</strong>?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => { 
          }
        }, {
          text: 'Yes',
          handler: async () => {   
            this.deployNow();
          }
        }
      ]
    }); 
    await alert.present();
  }

  async deployNow() {  
    // var loading = await  this.loadingController.create({ message: "Please wait ...."  });
    // await loading.present(); 
    // await BlockUtils.setLocalBlocks(this.maindatas,this.wmatchingdtas);  
    // //clean data
    // BlockUtils.cleanBlocks(this.maindatas);
    // // this.wmatchingdtas =await WmatchingutilsService.pureGetWordMatch();
    // WmatchingutilsService.cleanWordMatch(this.wmatchingdtas,this.maindatas);  
    // // const localblocks = await BlockUtils.getLocalBlocks(); 
    // setTimeout(() => { 
    //   this.custHttps.post("debug-automation/deploy?project_id="+this.projectData.project_id,{
    //     blocks:this.maindatas,
    //     word_matches:this.wmatchingdtas
    //   }).subscribe(async (snap:any)=>{  
    //     loading.dismiss();  
    //   }, (errorCode: Response) => { 
    //     loading.dismiss(); 
    //     this.toast.presentToast("Something went wrong, please try again later.");
    //   });  
    // }, 1200);
  }

  async onClearAll(){ 
    
    const alert = await this.alertController.create({ 
      header: 'Clear',
      message: 'Do you want to <strong>clear</strong>?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => { 
          }
        }, {
          text: 'Yes',
          handler: async () => { 
              var loading = await  this.loadingController.create({ message: "Please wait ...."  });
              await loading.present(); 
              // const localBlocks = BlockUtils.getLocalBlocks();
              // if(localBlocks != null ||localBlocks != undefined || !localBlocks){  
              //   this.custHttps.del("delblocks",this.user.clientID)
              //   .subscribe(async (snap:any)=>{ 
              //     loading.dismiss();  
              //   }, 
              //   (errorCode: Response) => { 
              //     loading.dismiss(); 
              //   });
              // }
              // const localWordMatch = WmatchingutilsService.getWordMatch(); 
              // if(localWordMatch[0].user_possible_words.length != 0){  
              //   this.custHttps.del("delwordmatch",this.user.clientID)
              //   .subscribe(async (snap:any)=>{  
              //     loading.dismiss(); 
              //   }, 
              //   (errorCode: Response) => { 
              //     loading.dismiss(); 
              //   });
              // }
              // setTimeout(() => {
              //   loading.dismiss();
              //   this.toast.presentToast("Cleared successfully"); 
              //   localStorage.removeItem("word_matching_length");
              //   localStorage.removeItem("localblocks_length");
              //   window.location.reload();
              // }, 2300);
          }
        }
      ]
    }); 
    await alert.present();
  }
   

  async getCloudblocks(){    
    this.splCtrl.show();
    //BLOCKS 
    this.custHttps.get("debug-automation/getallblocks?project_id="+this.projectData.project_id)
    .subscribe(async (snap:any)=>{  
      this.splCtrl.dismiss(); 
      
      console.log(snap);
      if(!snap){  
        return;
      } 
      this.maindatas = new Array();
      this.wmatchingdtas = new Array();

      if(snap.blocks.length > 0){
        this.maindatas = snap.blocks; 
      }else{
        this.maindatas.push(
          {
            "block_name":"Welcome message",
            "mini_blocks":[ 
              ChatbotFunc.genText(`Hi, {{first name}}first_name}! {{last name}}last_name}! Nice to meet you.\n \t \tYou successfully connected your bot created on https://retailgate.chatbotbuilder.com to your page.`)
              ]
          }
        )
        this.maindatas.push(
          {
            "block_name":"Default message",
            "mini_blocks":[ 
              ChatbotFunc.genText(`This block is trying to understand the user response.`)
              ]
          }
        )
      }
      console.log(snap.wordmatches.length > 0);
      if(snap.wordmatches.length > 0){
        this.wmatchingdtas = snap.wordmatches;  
      }else{
        this.wmatchingdtas.push({user_possible_words:[],commands:[]});  
      }

      this.block =  this.maindatas[0];  
      console.log(JSON.stringify(this.wmatchingdtas));
      console.log(JSON.stringify(this.maindatas));
      this.block_index =0;  
      this.onSearch("");
      this.wordmatching.onSearch("");
      this.checkIsShowMinBlock(); 
    }, 
    async (errorCode: Response) => {  
      this.toast.presentToast("Something went wrong please try again later"); 
    });

    // this.wordmatching.getCloudblocks();
  }

  onAddTxtMiniBlock(){
    this.maindatas[this.block_index]
    .mini_blocks.push(ChatbotFunc.genText("What do you want to do next?"));
    BlockUtils.setLocalBlocks(this.maindatas,this.wmatchingdtas);  
    this.checkIsShowMinBlock();
  }

  onAddImgMiniBlock(){ 
    this.maindatas[this.block_index]
    .mini_blocks.push(ChatbotFunc.genImageTemplate(""));
    this.checkIsShowMinBlock();
    BlockUtils.setLocalBlocks(this.maindatas,this.wmatchingdtas);  
  }

  onAddCarMiniBlock(){
    let element=[{
        title: '',
        subtitle: '',
        image_url: '',
        default_action: {
          type: "web_url",
          url: "", 
          webview_height_ratio: "tall"
        },
        buttons:[] 
      }];   
    this.maindatas[this.block_index]
    .mini_blocks.push(ChatbotFunc.genCarousel(element));
    this.checkIsShowMinBlock();
    BlockUtils.setLocalBlocks(this.maindatas,this.wmatchingdtas);  
  }

  onAddCbackMiniBlock(){ 
    this.maindatas[this.block_index]
    .mini_blocks.push(ChatbotFunc.genURLCback(""));
    this.checkIsShowMinBlock(); 
    BlockUtils.setLocalBlocks(this.maindatas,this.wmatchingdtas);  
  }
  onAddLChatMiniBlock(){ 
    this.maindatas[this.block_index]
    .mini_blocks.push(ChatbotFunc.genLChat());
    this.checkIsShowMinBlock(); 
    BlockUtils.setLocalBlocks(this.maindatas,this.wmatchingdtas);  
  }

  onAddQreplyMiniBlock(){ 
    this.maindatas[this.block_index]
    .mini_blocks.push(ChatbotFunc.genQuickReply("",[]));
    this.checkIsShowMinBlock(); 
    BlockUtils.setLocalBlocks(this.maindatas,this.wmatchingdtas);  
  }

  onAddQReply(mini_block_i){
    this.maindatas[this.block_index].mini_blocks[mini_block_i]
    .message.quick_replies.push({ content_type:"text",
      title:"", payload:[] }); 
      BlockUtils.setLocalBlocks(this.maindatas,this.wmatchingdtas);  
  }

  kQreplyTxt(mini_block_i,qreplytxt){
    this.maindatas[this.block_index].mini_blocks[mini_block_i]
    .message.text =qreplytxt; 
    BlockUtils.setLocalBlocks(this.maindatas,this.wmatchingdtas);  
  }

  kURLCback(){
    BlockUtils.setLocalBlocks(this.maindatas,this.wmatchingdtas);  
  }

   onCMinBImg(file){
    if (file) {   
      BlobService.resize(file,600).then((data)=>{
        BlobService.bitmapToBlob(data).then((data)=>{ 
          this.saveImage(data).then((url)=>{ 
            if(this.enum_saveImg == "image"){
              this.maindatas[this.block_index]
              .mini_blocks[this.miniblock_index].message.attachment.payload.url = url;
            }if(this.enum_saveImg == "carousel"){
              this.maindatas[this.block_index]
              .mini_blocks[this.miniblock_index]
              .message.attachment.payload
              .elements[this.car_elem_i].image_url = url; 
            } 
            BlockUtils.setLocalBlocks(this.maindatas,this.wmatchingdtas);  
          })
        })
      })
    }
  }
  
  async saveImage(file){ 
    return new Promise<any>(async (resolve)=>{ 
      var loading = await this.loadingController.create({ message: "Please wait ...."  });
      await loading.present();  
      const data = await UploadtostService.uploadFile(file,'chatbotbuilder/'+UuidService.makeid(512));
      await loading.dismiss();  
      resolve(data.Location);
    })
  }

  miniblock_index=0;
  car_elem_i=-1;
  enum_saveImg='';
  onGetImg(miniblock_index,enum_saveImg,car_elem_i){ 
    this.enum_saveImg = enum_saveImg;
    this.miniblock_index = miniblock_index;
    this.car_elem_i = car_elem_i;
    $("#fUploadAuto").click();
  }

  onAddCarElem(mini_block_i){ 
    let element={
      title: '',
      subtitle: '',
      image_url: '',
      default_action: {
        type: "web_url",
        url: "", 
        webview_height_ratio: "tall"
      },
      buttons:[] 
    };   
    this.maindatas[this.block_index]
    .mini_blocks[mini_block_i].message.attachment.payload.elements.push(element);
    BlockUtils.setLocalBlocks(this.maindatas,this.wmatchingdtas);  
  } 

  onDelMiniBlock(mini_block_i){
    this.maindatas[this.block_index].mini_blocks.splice(mini_block_i,1);
    this.checkIsShowMinBlock();
    BlockUtils.setLocalBlocks(this.maindatas,this.wmatchingdtas);  
  }

  async onActionCback(ev,status,mini_block_i){ 
    const popover = await this.popoverController.create({
      component: AddCbackResponseComponent , 
      cssClass: 'ion-popover',
      event: ev,
      componentProps:{maindatas:this.maindatas, 
        wmatchingdtas:this.wmatchingdtas,
        status_title:status,
        mini_block_index:mini_block_i, 
        block_index:this.block_index}
    });
    return await popover.present();
  }

  async addTextButton(ev: any,mini_block_index) {  
    const popover = await this.popoverController.create({
      component: AddTextButtonPopupComponent , 
      cssClass: 'ion-popover',
      event: ev,
      componentProps:{maindatas:this.maindatas,
        wmatchingdtas:this.wmatchingdtas,
        is_add:true, 
        mini_block_index:mini_block_index,
        block_index:this.block_index}
    });
    return await popover.present();
  }

  async addLChatButton(ev: any,mini_block_index) {  
    this.maindatas[this.block_index].mini_blocks[mini_block_index]
    .message.attachment.payload.buttons.push({
      type: "postback",
      payload: {
        isUserStopChatLive :true,
        blocks : []
      },
      title: "Stop Chat"
    });
    
    const btn_i = this.maindatas[this.block_index].mini_blocks[mini_block_index]
    .message.attachment.payload.buttons.length -1;
    this.onLChatEdit(ev,mini_block_index,"Stop Chat",null,btn_i);
  }
  async addLUPChatButton(ev: any,mini_block_index) {  
    this.maindatas[this.block_index].mini_blocks[mini_block_index]
    .message.attachment.payload.buttons.push({
      type: "postback",
      payload: {
        isUserFollowUp :true,
        blocks : []
      },
      title: "Follow up"
    });
    const btn_i = this.maindatas[this.block_index].mini_blocks[mini_block_index]
    .message.attachment.payload.buttons.length -1;
    this.onLChatEdit(ev,mini_block_index,"Follow up",null,btn_i);
  }

  async onBtnTxtEdit(ev: any,mini_block_index,button_index,btn_name,txt_URL) {  
    const popover = await this.popoverController.create({
      component: AddTextButtonPopupComponent , 
      cssClass: 'ion-popover',
      event: ev,
      componentProps:{maindatas:this.maindatas, 
        wmatchingdtas:this.wmatchingdtas,
        mini_block_index:mini_block_index,
        button_index:button_index,
        btn_name:btn_name,
        txt_URL:txt_URL,
        block_index:this.block_index}
    });
    return await popover.present();
  } 
  async onQreplyEdit(ev: any,mini_block_index,qreply_i,qreply_title) { 
    const popover = await this.popoverController.create({
      component: AddQuickreplyComponent , 
      cssClass: 'ion-popover',
      event: ev,
      componentProps:{maindatas:this.maindatas, 
        wmatchingdtas:this.wmatchingdtas,
        mini_block_index:mini_block_index,
        qreply_i:qreply_i,
        btn_name:qreply_title, 
        block_index:this.block_index}
    });
    return await popover.present();
  } 
  async onLChatEdit(ev: any,mini_block_index,btn_name,localBlocks,button_index) {   
    this.checkIsShowMinBlock();
    const popover = await this.popoverController.create({
      component: EditStopChatlLiveComponent , 
      cssClass: 'ion-popover',
      event: ev,
      componentProps:{maindatas:this.maindatas, 
        wmatchingdtas:this.wmatchingdtas,
        mini_block_index:mini_block_index, 
        btn_name:btn_name, 
        localBlocks:localBlocks,
        button_index:button_index,
        block_index:this.block_index}
    });
    return await popover.present();
  } 
  
  onDelTxtBtn(mini_block_i,txtbtn_i){
    this.maindatas[this.block_index].mini_blocks[mini_block_i]
    .message.attachment.payload.buttons.splice(txtbtn_i,1);
    const btns  =this.maindatas[this.block_index].mini_blocks[mini_block_i]
    .message.attachment.payload.buttons;
     
    if(btns.length == 0){ 
      const txt = this.maindatas[this.block_index]
      .mini_blocks[mini_block_i].message.attachment.payload.text;
      this.maindatas[this.block_index]
      .mini_blocks[mini_block_i] = ChatbotFunc.genText(txt)
    } 
    BlockUtils.setLocalBlocks(this.maindatas,this.wmatchingdtas);  
  }

  onDelLChatBtn(mini_block_i,txtbtn_i){
    this.maindatas[this.block_index].mini_blocks[mini_block_i]
    .message.attachment.payload.buttons.splice(txtbtn_i,1);
    const btns  =this.maindatas[this.block_index].mini_blocks[mini_block_i]
    .message.attachment.payload.buttons;  
    BlockUtils.setLocalBlocks(this.maindatas,this.wmatchingdtas);   
    this.checkIsShowMinBlock();
  }

  onDelCarBtn(mini_block_i,element_i,button_index){
    this.maindatas[this.block_index].mini_blocks[mini_block_i]
    .message.attachment.payload.elements[element_i].buttons.splice(button_index,1);
    BlockUtils.setLocalBlocks(this.maindatas,this.wmatchingdtas);  
  }

  onDelQreply(mini_block_i,qreply_i){
    this.maindatas[this.block_index].mini_blocks[mini_block_i]
    .message.quick_replies.splice(qreply_i,1);
    BlockUtils.setLocalBlocks(this.maindatas,this.wmatchingdtas);  
  }

  async addCarButton(ev: any,mini_block_index,element_i) { 
    const popover = await this.popoverController.create({
      component: AddCarButtonComponent , 
      cssClass: 'ion-popover',
      event: ev,
      componentProps:{maindatas:this.maindatas,
        wmatchingdtas:this.wmatchingdtas,
        is_add:true,  
        element_i:element_i,
        mini_block_index:mini_block_index,
        block_index:this.block_index}
    });
    return await popover.present();
  }

  async onBtnCarEdit(ev: any,mini_block_index,button_index,btn_name,txt_URL,element_i) {  
    const popover = await this.popoverController.create({
      component: AddCarButtonComponent , 
      cssClass: 'ion-popover',
      event: ev,
      componentProps:{maindatas:this.maindatas, 
        wmatchingdtas:this.wmatchingdtas,
        mini_block_index:mini_block_index,
        button_index:button_index,
        btn_name:btn_name,
        element_i:element_i,
        txt_URL:txt_URL,
        block_index:this.block_index}
    });
    return await popover.present();
  } 
}
