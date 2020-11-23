
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController, PopoverController } from '@ionic/angular';
import { AddTextButtonPopupComponent } from '../add-text-button-popup/add-text-button-popup.component'; 
import { BlockUtils } from 'src/app/utils/block-utils';
import { UuidService } from 'src/app/utils/uuid.service';
import { ToastMessageService } from 'src/app/utils/toast-message.service';
import { CustomHttpService } from 'src/app/utils/custom-http.service';
import { ChatbotFunc } from 'src/app/utils/chatbot-func';
import { WmatchingutilsService } from 'src/app/utils/wmatchingutils.service';
import { BlobService } from 'src/app/utils/blob.service';
import { AddQuickreplyComponent } from '../add-quickreply/add-quickreply.component';
import { AddCarButtonComponent } from '../add-car-button/add-car-button.component';
import { AuthGuardService } from 'src/app/Auth/auth-guard.service';
import { Router } from '@angular/router';
import { AddCbackResponseComponent } from '../add-cback-response/add-cback-response.component';
 
declare var EmojiPicker:any
declare var $:any;
@Component({
  selector: 'app-automation',
  templateUrl: './automation.component.html',
  styleUrls: ['./automation.component.scss'] 
})
export class AutomationComponent implements OnInit { 
  block_index= 0; 
  btntxt_index = null;
  text=""
  maindatas = new Array();
  block :any;
  user:any;
  isShowMinBlock = true;
  constructor(private popoverController:PopoverController,
    private toast:ToastMessageService,
    private uuid:UuidService,
    private router :Router,
    private storage :AngularFireStorage,  
    private loadingController:LoadingController,
    private custHttps:CustomHttpService) { }

  async ngOnInit() {   
    this.user = JSON.parse(localStorage.getItem("-==0us"));
    this.initSortable();
    this.init();      
    
    $("#emojionearea1").emojioneArea({
      pickerPosition: "left",
      tonesStyle: "bullet"
    });
    $("#emojionearea2").emojioneArea({
      pickerPosition: "bottom",
      tonesStyle: "radio"
    });
    $("#emojionearea3").emojioneArea({
      pickerPosition: "left",
      filtersPosition: "bottom",
      tonesStyle: "square"
    });
    $("#emojionearea4").emojioneArea({
      pickerPosition: "bottom",
      filtersPosition: "bottom",
      tonesStyle: "checkbox"
    });
    $("#emojionearea5").emojioneArea({
      pickerPosition: "top",
      filtersPosition: "bottom",
      tones: false,
      autocomplete: false,
      inline: true,
      hidePickerOnBlur: false
    });
  }  

  checkIsShowMinBlock() {
    const mini_blocks = this.maindatas[this.block_index].mini_blocks;  
    let isShow = mini_blocks.findIndex(o => o.type === 'cback-only'); 
    if(isShow != -1){
      this.isShowMinBlock = false;
    }else{
      this.isShowMinBlock = true;
    }
    console.log(isShow);
    console.log(this.isShowMinBlock);
  } 

  onNavMinblock(i){
    var elmnt = document.getElementById("min_block_"+i) ;
    console.log(elmnt);
    elmnt.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
        _this.maindatas[_this.block_index].mini_blocks = sets;
        console.log(_this.maindatas[_this.block_index].mini_blocks);
        BlockUtils.setLocalBlocks(_this.maindatas);
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
         _this.maindatas[_this.block_index].mini_blocks = sets;
         console.log(_this.maindatas[_this.block_index].mini_blocks);
         BlockUtils.setLocalBlocks(_this.maindatas);
         $(".slide-placeholder-animator").remove(); 
      },
     });
  }

  init() { 
    console.log("init");  
    if(BlockUtils.getLocalBlocks() == undefined
    ||BlockUtils.getLocalBlocks() == null  ){ 
      this.initMaindatas();
      this.getCloudblocks(); 
    }else{ 
      this.maindatas = BlockUtils.getLocalBlocks();
      this.block = this.maindatas[0];
    } 
    
    // setTimeout(() => { 
    //   const mini_blocks =this.maindatas[this.block_index].mini_blocks;
    //   for(let i = 0 ; i < mini_blocks.length ;i ++){
    //     const type = mini_blocks[i].type;
    //     if(type == "text-only" || type == "button-text-only"){
    //       console.log( $("#min_block_text"+i));
    //       $("#min_block_text"+i).emojioneArea({
    //         pickerPosition: "bottom",
    //         tonesStyle: "radio"
    //       });
    //     }
    //   }
    // }, 500);

    this.checkIsShowMinBlock();
    BlockUtils.setLocalBlocks(this.maindatas); 
  } 

  initMaindatas() {
    if(this.maindatas.length == 0){
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
    }
  }

  addBlock(){
    this.maindatas.push(
      {
        "block_name":this.maindatas.length+". Block",
        "mini_blocks":[ 
          ChatbotFunc.genText("What do you want to do next?")
          ]
      }
    )
    console.log(this.maindatas);
    BlockUtils.setLocalBlocks(this.maindatas);
  } 
  
  onBlocks(block,i){
    this.block = block; 
    this.block_index = i;
    console.log(this.block_index);
    this.checkIsShowMinBlock();
  }
  onDelBlock(block_i){
    this.maindatas.splice(block_i,1);
    BlockUtils.setLocalBlocks(this.maindatas);
  }
  kTitleTxt(txt,min_block,mini_block_i){
    console.log(txt) 
    console.log(txt);
    if(min_block.type == 'text-only'){
      this.maindatas[this.block_index].mini_blocks[mini_block_i].message.text = txt;
    }else{
      this.maindatas[this.block_index].mini_blocks[mini_block_i].message.attachment.payload.text = txt;
    }
    console.log(this.maindatas); 
    BlockUtils.setLocalBlocks(this.maindatas);
  }  

  kFocusOTitle(block_name){ 
    this.maindatas[this.block_index].block_name = block_name;
    console.log(this.maindatas); 
    BlockUtils.setLocalBlocks(this.maindatas);
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
    BlockUtils.setLocalBlocks(this.maindatas);
  }


  
  async onDeploy(){
    var loading = await  this.loadingController.create({ message: "Please wait ...."  });
    await loading.present(); 

    if(BlockUtils.getLocalBlocks() != null || BlockUtils.getLocalBlocks() != undefined || !BlockUtils.getLocalBlocks()){ 
      this.custHttps.post("setallblocks/"+this.user.clientID,BlockUtils.getLocalBlocks())
      .subscribe(async (snap:any)=>{  
        loading.dismiss();
        console.log(snap)  
      }, 
      (errorCode: Response) => { 
        loading.dismiss();
        console.log(errorCode) 
        this.toast.presentToast("Something went wrong, please try again later.");
      });  
    }

    if(WmatchingutilsService.getWordMatch()[0].user_possible_words.length != 0){
      console.log("word matching is not null");
      this.custHttps.post("setwordmatch/"+this.user.clientID,WmatchingutilsService.getWordMatch())
      .subscribe(async (snap:any)=>{  
        console.log(snap) 
        loading.dismiss();
      }, 
      (errorCode: Response) => { 
        loading.dismiss();
        console.log(errorCode) 
        this.toast.presentToast("Something went wrong, please try again later.");
      });
    }
  }
  
  onClearAll(){

  }

  async getCloudblocks(){  
    var loading = await  this.loadingController.create({ message: "Please wait ...."  });
    await loading.present();
    console.log(this.user);
    this.custHttps.get("getallblocks/"+this.user.clientID)
    .subscribe(async (snap:any)=>{ 
      await loading.dismiss();
      snap = snap.response;
      console.log(snap);
      if(!snap){ 
        return;
      }
      console.log(snap);
      this.maindatas = snap;  
      BlockUtils.setLocalBlocks(this.maindatas); 
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

  onAddTxtMiniBlock(){
    this.maindatas[this.block_index]
    .mini_blocks.push(ChatbotFunc.genText("What do you want to do next?"));
    BlockUtils.setLocalBlocks(this.maindatas); 
    this.checkIsShowMinBlock();
  }

  onAddImgMiniBlock(){
    console.log(this.maindatas);
    console.log(this.block_index);
    this.maindatas[this.block_index]
    .mini_blocks.push(ChatbotFunc.genImageTemplate(""));
    this.checkIsShowMinBlock();
    BlockUtils.setLocalBlocks(this.maindatas);
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
    BlockUtils.setLocalBlocks(this.maindatas); 
  }

  onAddCbackMiniBlock(){ 
    this.maindatas[this.block_index]
    .mini_blocks.push(ChatbotFunc.genURLCback(""));
    this.checkIsShowMinBlock();
    console.log(this.maindatas);
    BlockUtils.setLocalBlocks(this.maindatas);
  }

  onAddQreplyMiniBlock(){
    console.log(this.maindatas);
    console.log(this.block_index);
    this.maindatas[this.block_index]
    .mini_blocks.push(ChatbotFunc.genQuickReply("",[]));
    this.checkIsShowMinBlock(); 
    BlockUtils.setLocalBlocks(this.maindatas);
  }

  onAddQReply(mini_block_i){
    this.maindatas[this.block_index].mini_blocks[mini_block_i]
    .message.quick_replies.push({ content_type:"text",
      title:"", payload:[] });
    console.log(this.maindatas);
    BlockUtils.setLocalBlocks(this.maindatas);
  }

  kQreplyTxt(mini_block_i,qreplytxt){
    this.maindatas[this.block_index].mini_blocks[mini_block_i]
    .message.text =qreplytxt;
    console.log(this.maindatas);
    BlockUtils.setLocalBlocks(this.maindatas);
  }

  kURLCback(){
    BlockUtils.setLocalBlocks(this.maindatas);
  }

  onCMinBImg(file,miniblock_index){
    if (file) {     
      BlobService.resize(file,140).then((data)=>{
        //console.log(data); 
        BlobService.bitmapToBlob(data)
        .then(data=>{ 
          console.log(data);
          this.saveImage(data).then((url)=>{ 
            if(this.enum_saveImg == "image"){
              this.maindatas[this.block_index]
              .mini_blocks[this.miniblock_index].message.attachment.payload.url = url;
              BlockUtils.setLocalBlocks(this.maindatas);
            }if(this.enum_saveImg == "carousel"){
              this.maindatas[this.block_index]
              .mini_blocks[this.miniblock_index]
              .message.attachment.payload
              .elements[this.car_elem_i].image_url = url;
              console.log(JSON.stringify(this.maindatas));
            }
          })
        }) 
      });
    }
  }
  
  async saveImage(file){ 
    return new Promise<any>(async (resolve)=>{ 
      var loading = await this.loadingController.create({ message: "Please wait ...."  });
      await loading.present(); 
      const filePath = 'ChatBot/Images/'+ this.uuid.makeid(12); 
      this.storage.upload(filePath,file).then((data1) => { 
        this.storage.ref(data1.metadata.fullPath)
        .getDownloadURL().subscribe(url => {  
          loading.dismiss();
          resolve(url);
        }) 
      });
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
     BlockUtils.setLocalBlocks(this.maindatas);
  } 

  onDelMiniBlock(mini_block_i){
    this.maindatas[this.block_index].mini_blocks.splice(mini_block_i,1);
    this.checkIsShowMinBlock();
    BlockUtils.setLocalBlocks(this.maindatas);
  }

  async onActionCback(ev,status,mini_block_i){ 
    const popover = await this.popoverController.create({
      component: AddCbackResponseComponent , 
      cssClass: 'ion-popover',
      event: ev,
      componentProps:{maindatas:this.maindatas, 
        status_title:status,
        mini_block_index:mini_block_i, 
        block_index:this.block_index}
    });
    return await popover.present();
  }

  async addTextButton(ev: any,mini_block_index) {
    console.log(this.block.mini_blocks[mini_block_index].type);
    if(this.block.mini_blocks[mini_block_index].type =="button-text-only"){
      let btns_length =this.block.mini_blocks[mini_block_index].message.attachment.payload.buttons.length;
    }
    const popover = await this.popoverController.create({
      component: AddTextButtonPopupComponent , 
      cssClass: 'ion-popover',
      event: ev,
      componentProps:{maindatas:this.maindatas,
        is_add:true, 
        mini_block_index:mini_block_index,
        block_index:this.block_index}
    });
    return await popover.present();
  }
  async onBtnTxtEdit(ev: any,mini_block_index,button_index,btn_name,txt_URL) { 
    console.log(btn_name);
    const popover = await this.popoverController.create({
      component: AddTextButtonPopupComponent , 
      cssClass: 'ion-popover',
      event: ev,
      componentProps:{maindatas:this.maindatas, 
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
        mini_block_index:mini_block_index,
        qreply_i:qreply_i,
        btn_name:qreply_title, 
        block_index:this.block_index}
    });
    return await popover.present();
  } 
  onDelTxtBtn(mini_block_i,txtbtn_i){
    this.maindatas[this.block_index].mini_blocks[mini_block_i]
    .message.attachment.payload.buttons.splice(txtbtn_i,1);
    BlockUtils.setLocalBlocks(this.maindatas);
    const btns  =this.maindatas[this.block_index].mini_blocks[mini_block_i]
    .message.attachment.payload.buttons;
     
    if(btns.length == 0){ 
      const txt = this.maindatas[this.block_index]
      .mini_blocks[mini_block_i].message.attachment.payload.text;
      this.maindatas[this.block_index]
      .mini_blocks[mini_block_i] = ChatbotFunc.genText(txt)
    } 
  }
  onDelCarBtn(mini_block_i,element_i,button_index){
    this.maindatas[this.block_index].mini_blocks[mini_block_i]
    .message.attachment.payload.elements[element_i].buttons.splice(button_index,1);
    BlockUtils.setLocalBlocks(this.maindatas);
  }
  onDelQreply(mini_block_i,qreply_i){
    this.maindatas[this.block_index].mini_blocks[mini_block_i]
    .message.quick_replies.splice(qreply_i,1);
    BlockUtils.setLocalBlocks(this.maindatas);
  }
  async addCarButton(ev: any,mini_block_index,element_i) {
    console.log(this.block.mini_blocks[mini_block_index].type); 
    const popover = await this.popoverController.create({
      component: AddCarButtonComponent , 
      cssClass: 'ion-popover',
      event: ev,
      componentProps:{maindatas:this.maindatas,
        is_add:true, 
        element_i:element_i,
        mini_block_index:mini_block_index,
        block_index:this.block_index}
    });
    return await popover.present();
  }

  async onBtnCarEdit(ev: any,mini_block_index,button_index,btn_name,txt_URL,element_i) { 
    console.log(btn_name);
    const popover = await this.popoverController.create({
      component: AddCarButtonComponent , 
      cssClass: 'ion-popover',
      event: ev,
      componentProps:{maindatas:this.maindatas, 
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
