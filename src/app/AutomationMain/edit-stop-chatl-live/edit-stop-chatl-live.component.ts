import { Component, Input, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockUtils } from 'src/app/utils/block-utils'; 
@Component({
  selector: 'app-edit-stop-chatl-live',
  templateUrl: './edit-stop-chatl-live.component.html',
  styleUrls: ['./edit-stop-chatl-live.component.scss'],
})
export class EditStopChatlLiveComponent implements OnInit {
  @Input() maindatas :any; 
  @Input() wmatchingdtas :any; 
  
  @Input() block_index = 0 ;
  @Input() mini_block_index  = 0 ;   
  @Input() btn_name ="";  
  @Input() localBlocks :any;
  @Input() button_index =0;
  mini_block :any;  
 
  blocks = new Array();
  show_blocks = new Array();
 
  constructor(private formBuilder:FormBuilder) { 
  }
  
  ngOnInit() {     
    this.mini_block = this.maindatas[this.block_index].
    mini_blocks[this.mini_block_index]; 
  
    // let localBlocks = this.mini_block.message.attachment.payload.buttons[0].payload.blocks
     
    if(this.localBlocks != null || this.localBlocks != undefined){
      this.saveHasBlocks(this.localBlocks);
    }else{
      this.saveNoBlocks();
    } 
    BlockUtils.setLocalBlocks(this.maindatas,this.wmatchingdtas);  
    this.show_blocks= this.blocks;
  }
 

  saveNoBlocks() { 
    for(let i  = 0 ; i < this.maindatas.length; i++){
      this.blocks.push({
        block_name:this.maindatas[i].block_name,
        block_index:i,
        //ischecked:false
      })
    } 
  }



  saveHasBlocks(localBlocks) { 
    for(let i  = 0 ; i < this.maindatas.length; i++){
      let bblock;
      bblock = {
        block_name:this.maindatas[i].block_name,
        block_index:i,
        //ischecked:false
      }
      if(localBlocks[i]){
        bblock.ischecked = localBlocks[i].ischecked;
      } 
      this.blocks[i]=bblock;
    } 
  } 
  
  kBtnTitle(){ 
    if(this.maindatas[this.block_index].mini_blocks[this.mini_block_index].message.attachment){
      
      this.maindatas[this.block_index].mini_blocks[this.mini_block_index]
    .message.attachment.payload.buttons[this.button_index].title = this.btn_name; 
      BlockUtils.setLocalBlocks(this.maindatas,this.wmatchingdtas); 
    } 
  }
  
  onCheckBtnBlock(block_name){
    const index = this.blocks.findIndex(o=>o.block_name === block_name);
    if(index != null){
      this.blocks[index].ischecked = !this.blocks[index].ischecked;
    }  
    this.maindatas[this.block_index].mini_blocks[this.mini_block_index]
    .message.attachment.payload.buttons[this.button_index].payload.blocks= this.blocks; 
    BlockUtils.setLocalBlocks(this.maindatas,this.wmatchingdtas);  
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
