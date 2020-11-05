import { Component, OnInit } from '@angular/core'; 
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController, PopoverController } from '@ionic/angular';
 
import { AddTextButtonPopupComponent } from '../add-text-button-popup/add-text-button-popup.component';
import { BlobService } from '../utils/blob.service';
import { BlockUtils } from '../utils/block-utils';
import { ChatbotFunc } from '../utils/chatbot-func';
import { CustomHttpService } from '../utils/custom-http.service';
import { ToastMessageService } from '../utils/toast-message.service';
import { UuidService } from '../utils/uuid.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'; 

declare var $:any;
@Component({
  selector: 'app-automation',
  templateUrl: './automation.component.html',
  styleUrls: ['./automation.component.scss'],
})
export class AutomationComponent implements OnInit { 
  block_index= 0; 
  btntxt_index = null;

  maindatas = new Array();
  block :any;
  constructor(private popoverController:PopoverController,
    private toast:ToastMessageService,
    private uuid:UuidService,
    private storage :AngularFireStorage, 
    private loadingController:LoadingController,
    private custHttps:CustomHttpService) { }

  ngOnInit() { 
    this.initSortable();
    // $( function() {
    //   $( "#sortable" ).sortable();
    //   $( "#sortable" ).disableSelection();
    // } );
    this.init(); 
    if(BlockUtils.getLocalBlocks() == undefined
     ||BlockUtils.getLocalBlocks() == null  ){ 
      this.initMaindatas();
      this.getCloudblocks();
    }else{ 
      this.maindatas = BlockUtils.getLocalBlocks();
      this.block = this.maindatas[0];
    }
    console.log(JSON.stringify(this.maindatas));
    console.log(this.block);
    BlockUtils.setLocalBlocks(this.maindatas); 
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
        _this.maindatas[0].mini_blocks = sets;
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
         _this.maindatas[0].mini_blocks = sets;
         console.log(_this.maindatas[_this.block_index].mini_blocks);
         BlockUtils.setLocalBlocks(_this.maindatas);
         $(".slide-placeholder-animator").remove(); 
      },
     });
  }

  init() { 
    let inter = setInterval(()=>{
      clearInterval(inter);
      $('textarea').height($("textarea").prop('scrollHeight'));
    },1000);

    $("textarea").keyup(function(e) { 
      console.log("asd")
      while($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
          $(this).height($(this).height()+1);
      };
    });
  } 

  async addTextButton(ev: any,mini_block_index) {
    console.log(this.block.mini_blocks[mini_block_index].type);
    if(this.block.mini_blocks[mini_block_index].type =="button-text-only"){
      let btns_length =this.block.mini_blocks[mini_block_index].message.attachment.payload.buttons.length;
      if(btns_length == 3){
        $("#add-"+mini_block_index).hide();
        return;
      }
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

  initMaindatas() {
    if(this.maindatas.length == 0){
      this.maindatas.push(
        {
          "block_name":"Welcome message",
          "mini_blocks":[ 
            ChatbotFunc.genText(`Hi, {{first name}}name}! Nice to meet you.

            You successfully connected your bot created on https://retailgate.chatbotbuilder.com to your page.`)
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
  }
 
  kTitleTxt(txt,min_block,mini_block_i){
    if(min_block.type == 'text-only'){
      this.maindatas[this.block_index].mini_blocks[mini_block_i].message.text = txt;
    }else{
      this.maindatas[this.block_index].mini_blocks[mini_block_i].message.attachment.payload.text = txt;
    }
    console.log(this.maindatas); 
    BlockUtils.setLocalBlocks(this.maindatas);
  }
 
  kBlockTitle(block_name){
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
  delBtnTxt(mini_block_index,button_index){
    this.maindatas[this.block_index].mini_blocks[mini_block_index].message.attachment.payload.buttons.splice(button_index,1);
    BlockUtils.setLocalBlocks(this.maindatas);
  }
  async onDeploy(){
    var loading = await  this.loadingController.create({ message: "Please wait ...."  });
    await loading.present();
    let data = BlockUtils.getLocalBlocks();
    
    this.custHttps.postNoToken("setallblocks/1",data)
    .subscribe(async (snap:any)=>{ 
      console.log(data);
      console.log(snap) 
      loading.dismiss();
    }, 
    (errorCode: Response) => { 
      loading.dismiss();
      console.log(errorCode) 
    });
    
  }

  getCloudblocks(){  
    this.custHttps.get("getallblocks/1")
    .subscribe(async (snap:any)=>{ 
      snap = snap.response;
      console.log(snap);
      if(!snap){
        this.initMaindatas();
        return;
      }
      console.log(snap);
      this.maindatas = snap;
      BlockUtils.setLocalBlocks(this.maindatas);
      window.location.reload();
    }, 
    (errorCode: Response) => { 
      console.log(errorCode) 
    });
  }

  onAddTxtMiniBlock(){
    this.maindatas[this.block_index]
    .mini_blocks.push(ChatbotFunc.genText("What do you want to do next?"));
    BlockUtils.setLocalBlocks(this.maindatas);
  }

  onAddImgMiniBlock(){
    console.log(this.maindatas);
    console.log(this.block_index);
    this.maindatas[this.block_index]
    .mini_blocks.push(ChatbotFunc.genImageTemplate(""));
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
  drop(event){
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.maindatas[this.block_index].mini_blocks = event.container.data;
    BlockUtils.setLocalBlocks(this.maindatas)
  }
}
