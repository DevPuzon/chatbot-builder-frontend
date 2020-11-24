import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { BlockUtils } from 'src/app/utils/block-utils';   
import { WmatchingutilsService } from 'src/app/utils/wmatchingutils.service';
@Component({
  selector: 'app-wm-properties',
  templateUrl: './wm-properties.component.html',
  styleUrls: ['./wm-properties.component.scss'],
})
export class WmPropertiesComponent implements OnInit  {
  @Input() txt_message= "";
  @Input() wmatchingdtas_i = 0;  
  @Input() command_i = 0;  
  @Input() wmatchingdtas  = new Array();
  wmatchingdta :any;
  maindatas= new Array(); 
  
  constructor(private popCtrl:PopoverController) { }
 
  ngOnInit() {
    console.log( this.txt_message)
    this.init();
  }
  init() {
    console.log(this.command_i);
    this.wmatchingdta = this.wmatchingdtas[this.wmatchingdtas_i];
    this.maindatas = BlockUtils.getLocalBlocks();
    console.log(this.wmatchingdta);
    
    let local_block_p =WmatchingutilsService.getBlockProperties(this.wmatchingdta.commands[this.command_i]);
    if(!local_block_p){
      this.saveNoBlocks();
    }else{
      this.saveHasBlocks(local_block_p);
    }
  }

  is_block=true;
  isBlock(){
    this.is_block= !this.is_block;
  } 

  blocks = new Array();
  saveNoBlocks() {
    console.log("saveNoBlocks"); 
    for(let i  = 0 ; i < this.maindatas.length; i++){
      // this.wmatchingdta.commands[this.command_i].block_properties.push({
      //   block_name:this.maindatas[i].block_name,
      //   block_index:i,
      //   ischecked:false
      // });
      this.blocks.push({
        block_name:this.maindatas[i].block_name,
        block_index:i,
        ischecked:false
      });
    }
    // this.blocks = this.wmatchingdta.commands[0].block_properties;
    console.log(this.wmatchingdta);
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
      this.blocks[i]=bblock;
      this.wmatchingdta.commands[this.command_i].block_properties[i] = bblock;
    }
    console.log(this.blocks);
  }
  
  onCheckBtnBlock(index){  
    console.log(index);
    if(index != null){    
      this.wmatchingdta.commands[this.command_i] = {}; 
      let boolGl = !this.blocks[index].ischecked;  
      console.log(boolGl);
      this.blocks[index].ischecked = boolGl;
      this.wmatchingdtas[this.wmatchingdtas_i].commands[this.command_i]={
        block_properties : this.blocks,
        command_type:"block"
      } 
    }  
 
    WmatchingutilsService.setWordMatch(this.wmatchingdtas);
    console.log(JSON.stringify(this.wmatchingdtas));
  }

  
  showEmojiPicker = false; 
  toggleEmojiPicker() {
    console.log(this.showEmojiPicker);
        this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmojiTextBtnOnly(event) { 
    let message ="";
    console.log(message);
    console.log(`${event.emoji.native}`)
    const text = `${message}${event.emoji.native}`; 
    console.log(text);
    this.txt_message = this.txt_message + text;
    this.kMessage();
    // this.showEmojiPicker = false;
  } 
  kMessage(){
    if(this.txt_message !=""){
      console.log(this.txt_message) ; 
      this.wmatchingdta.commands[this.command_i] = {}; 
      this.wmatchingdtas[this.wmatchingdtas_i].commands[this.command_i].command_type= "text_message";
      this.wmatchingdtas[this.wmatchingdtas_i].commands[this.command_i]={ 
        command_type:"text_message",
        text_message : this.txt_message
      }  
    }else{ 
      this.wmatchingdta.commands.splice(this.command_i,1);
    }
   
    for(let i = 0 ; i < this.blocks.length;i++){
      this.blocks[i].ischecked =false;
    }
    WmatchingutilsService.setWordMatch(this.wmatchingdtas);
    console.log(JSON.stringify(this.wmatchingdtas));

  }
  onEnterMsg(){
    console.log("onEnterMsg");
    this.popCtrl.dismiss();
  }
}
