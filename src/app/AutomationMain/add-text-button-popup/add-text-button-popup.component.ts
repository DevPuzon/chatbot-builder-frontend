import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { BlockUtils } from 'src/app/utils/block-utils';
import { ChatbotFunc } from 'src/app/utils/chatbot-func';

@Component({
  selector: 'app-add-text-button-popup',
  templateUrl: './add-text-button-popup.component.html',
  styleUrls: ['./add-text-button-popup.component.scss'],
})
export class AddTextButtonPopupComponent implements OnInit {
  @Input() maindatas :any;

  @Input() block_index = 0 ;
  @Input() mini_block_index  = 0 ; 
  @Input() is_add  = false ; 
  @Input() btn_name =""; 
  @Input() txt_URL =""; 
  
  mini_block :any;
  @Input() button_index  = 0 ;
  is_block = true;
 
  blocks = new Array();
 
  constructor(private formBuilder:FormBuilder) { 
  }

  ngOnInit() {   
    this.mini_block = this.maindatas[this.block_index].
    mini_blocks[this.mini_block_index];
    this.onCheckButton();

    console.log(this.maindatas); 

    console.log(this.mini_block_index);
    console.log(this.button_index);
    let localBlocks = BlockUtils.getTxtButtonBlocks(this.block_index,this.mini_block_index,this.button_index);
    
    console.log(localBlocks);
    if(localBlocks != null || localBlocks != undefined){
      this.saveHasBlocks(localBlocks);
    }else{
      this.saveNoBlocks();
    }
    BlockUtils.setLocalBlocks(this.maindatas); 
  }

  onCheckButton() {
    if(this.is_add){ 
      if(this.mini_block.message.attachment){ 
        this.button_index = this.mini_block.message.attachment.payload.buttons.length;
      }
    }
  }

  saveNoBlocks() {
    console.log("saveNoBlocks");
    for(let i  = 0 ; i < this.maindatas.length; i++){
      this.blocks.push({
        block_name:this.maindatas[i].block_name,
        block_index:i,
        ischecked:false
      })
    }
    console.log(this.blocks);
  }
  saveHasBlocks(localBlocks) {
    console.log("saveHasBlocks");
    console.log(localBlocks); 
    for(let i  = 0 ; i < this.maindatas.length; i++){
      let bblock = {
        block_name:this.maindatas[i].block_name,
        block_index:i,
        ischecked:false
      }
      if(localBlocks[i]){
        bblock.ischecked = localBlocks[i].ischecked;
      }
      // for(let ii = 0 ; ii < localBlocks.length; ii++){
      //   bblock = localBlocks[i].ischecked;
      // }
      this.blocks[i]=bblock;
    }
    console.log(this.blocks);
  }

  segment="block";
  isBlock(){
    this.is_block= !this.is_block;
  }
  
  kBtnTitle(){
    // this.onCheckBtnBlock(null);
    if(this.maindatas[this.block_index].mini_blocks[this.mini_block_index].message.attachment){
      let btn = this.maindatas[this.block_index].mini_blocks[this.mini_block_index].message.attachment.payload.buttons[this.button_index];
      btn.title = this.btn_name;
      BlockUtils.setLocalBlocks(this.maindatas);
    } 
  }

  kURL(){
    for(let i = 0 ; i < this.blocks.length ; i ++){
      this.blocks[i].ischecked = false;
    }
    this.onCheckURLBlock(null); 
    BlockUtils.setLocalBlocks(this.maindatas);
  }

  // {
  //   "type":"web_url",
  //   "url":"https://www.messenger.com",
  //   "title":"Visit Messenger"
  // }
  // [{"block_name":"name","ischecked":false}]
  onCheckBtnBlock(index){
    if(index != null){
      this.blocks[index].ischecked = !this.blocks[index].ischecked;
    }

    console.log(this.blocks);
    // "type":"postback",
    // "payload":'[{"block_name":"name","block_index":0,"ischecked":false}]',
    // "title":"Default Block"
    let buttons = new Array();
    let func;
    console.log(this.button_index);
    if(this.mini_block.type == "button-text-only"){
      buttons = this.mini_block.message.attachment.payload.buttons; 
      buttons[this.button_index] =
      {
        type:"postback",
        payload:this.blocks,
        title:this.btn_name
      }
     func = ChatbotFunc.genButtonTemplate(this.mini_block.message.attachment.payload.text,buttons);
    }else{
      buttons[this.button_index] =
      {
        type:"postback",
        payload:this.blocks,
        title:this.btn_name
      }
      func = ChatbotFunc.genButtonTemplate(this.mini_block.message.text,buttons);
    }
    this.maindatas[this.block_index].mini_blocks[this.mini_block_index] = func;
    console.log(this.maindatas);
    BlockUtils.setLocalBlocks(this.maindatas); 
  }

  onCheckURLBlock(index){
    if(index != null){
      this.blocks[index].ischecked = !this.blocks[index].ischecked;
    }

    console.log(this.blocks);
    // "type":"postback",
    // "payload":'[{"block_name":"name","block_index":0,"ischecked":false}]',
    // "title":"Default Block"
    let buttons = new Array();
    let func;
    console.log(this.button_index);
    if(this.mini_block.type == "button-text-only"){
      buttons = this.mini_block.message.attachment.payload.buttons; 
      buttons[this.button_index] =
      {
        type:"web_url",
        url:this.txt_URL, 
        title:this.btn_name
      }
     func = ChatbotFunc.genButtonTemplate(this.mini_block.message.attachment.payload.text,buttons);
    }else{
      buttons[this.button_index] =
      {
        type:"web_url",
        url:this.txt_URL, 
        title:this.btn_name
      }
      func = ChatbotFunc.genButtonTemplate(this.mini_block.message.text,buttons);
    }
    this.maindatas[this.block_index].mini_blocks[this.mini_block_index] = func;
    console.log(this.maindatas);
    BlockUtils.setLocalBlocks(this.maindatas); 
  }
}
