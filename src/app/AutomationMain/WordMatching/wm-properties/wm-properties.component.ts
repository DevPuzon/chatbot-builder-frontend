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
  @Input() maindatas= new Array(); 
  
  constructor(private popCtrl:PopoverController) { }
 
  ngOnInit() { 
    this.init();
    this.show_blocks= this.blocks;
  }
  init() { 
    this.wmatchingdta = this.wmatchingdtas[this.wmatchingdtas_i];  
    
    let local_block_p =WmatchingutilsService.getBlockProperties(this.wmatchingdta.commands[this.command_i]);
    if(!local_block_p){
      this.saveNoBlocks();
    }else{
      this.saveHasBlocks(local_block_p);
    }
  }

  is_block=true;
  isBlock(is_block){
    this.is_block= is_block;
  } 

  blocks = new Array();
  show_blocks = new Array();
  saveNoBlocks() { 
    for(let i  = 0 ; i < this.maindatas.length; i++){
      // this.wmatchingdta.commands[this.command_i].block_properties.push({
      //   block_name:this.maindatas[i].block_name,
      //   block_index:i,
      //   //ischecked:false
      // });
      this.blocks.push({
        block_name:this.maindatas[i].block_name,
        block_index:i,
        //ischecked:false
      });
    }
    // this.blocks = this.wmatchingdta.commands[0].block_properties; 
  }
  saveHasBlocks(localBlocks) { 
    for(let i  = 0 ; i < this.maindatas.length; i++){
      let bblock ;
      bblock ={
        block_name:this.maindatas[i].block_name,
        block_index:i,
        //ischecked:false
      }
      if(localBlocks[i]){
        bblock.ischecked = localBlocks[i].ischecked;
      } 
      this.blocks[i]=bblock;
      this.wmatchingdta.commands[this.command_i].block_properties[i] = bblock;
    } 
  }
  
  onCheckBtnBlock(block_name){
    const index = this.blocks.findIndex(o=>o.block_name === block_name);
    if(index != null){    
      this.wmatchingdta.commands[this.command_i] = {}; 
      let boolGl = !this.blocks[index].ischecked;   
      this.blocks[index].ischecked = boolGl;
      this.wmatchingdtas[this.wmatchingdtas_i].commands[this.command_i]={
        block_properties : this.blocks,
        command_type:"block"
      } 
    }  
 
    WmatchingutilsService.cleanWordMatch(this.wmatchingdtas,this.maindatas);  
  }

  
  showEmojiPicker = false; 
  toggleEmojiPicker() { 
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmojiTextBtnOnly(event) { 
    let message =""; 
    const text = `${message}${event.emoji.native}`; 
    this.txt_message = this.txt_message + text;
    this.kMessage();
    // this.showEmojiPicker = false;
  } 
  kMessage(){
    if(this.txt_message !=""){ 
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
    WmatchingutilsService.cleanWordMatch(this.wmatchingdtas,this.maindatas);  

  }
  onEnterMsg(){ 
    this.popCtrl.dismiss();
  }

  
  onInput(txt){
    if(txt ==""){
      this.show_blocks = this.blocks;
    }else{  
      let arr_map = this.blocks.map(el => el.block_name); 
      const search_bools = this.search(arr_map,txt);
      this.show_blocks = new Array(); 
      for(let i = 0 ; i < search_bools.length ;i++){
        if(search_bools[i]){
          this.show_blocks.push(this.blocks[i]);
        }
      }
    }
  }
  onCancel(){
    this.show_blocks = this.blocks;
  }
  
  search(arr_map,text){
    let ret = [];
    for(let i = 0 ; i < arr_map.length;i++){
      const map = arr_map[i].toLowerCase();
      ret.push(map.includes(text.toLowerCase()));
    }
    return ret;
  }
}
