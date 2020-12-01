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
  @Input() block_index = 0 ;
  @Input() mini_block_index  = 0 ;   
  @Input() btn_name ="";  
  
  mini_block :any;  
 
  blocks = new Array();
  show_blocks = new Array();
 
  constructor(private formBuilder:FormBuilder) { 
  }
  
  ngOnInit() {    
    console.log("EditStopChatlLiveComponent");
    this.mini_block = this.maindatas[this.block_index].
    mini_blocks[this.mini_block_index]; 

    console.log(this.maindatas); 

    console.log(this.mini_block_index);  
    let localBlocks = this.mini_block.message.attachment.payload.buttons[0].payload.blocks
    
    console.log(localBlocks);
    if(localBlocks != null || localBlocks != undefined){
      this.saveHasBlocks(localBlocks);
    }else{
      this.saveNoBlocks();
    }
    console.log(this.maindatas); 
    BlockUtils.setLocalBlocks(this.maindatas); 
    this.show_blocks= this.blocks;
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
      this.blocks[i]=bblock;
    }
    console.log(this.blocks);
  } 
  
  kBtnTitle(){ 
    if(this.maindatas[this.block_index].mini_blocks[this.mini_block_index].message.attachment){
      
      this.maindatas[this.block_index].mini_blocks[this.mini_block_index]
    .message.attachment.payload.text = this.btn_name; 
      BlockUtils.setLocalBlocks(this.maindatas);
    } 
  }
  
  onCheckBtnBlock(block_name){
    const index = this.blocks.findIndex(o=>o.block_name === block_name);
    if(index != null){
      this.blocks[index].ischecked = !this.blocks[index].ischecked;
    } 
    console.log(this.blocks);  
    console.log(this.maindatas[this.block_index].mini_blocks[this.mini_block_index]
      .message.attachment);
    this.maindatas[this.block_index].mini_blocks[this.mini_block_index]
    .message.attachment.payload.buttons[0].payload.blocks= this.blocks;
     
    console.log(JSON.stringify(this.maindatas));
    BlockUtils.setLocalBlocks(this.maindatas); 
  } 
  
  onInput(txt){
    if(txt ==""){
      this.show_blocks = this.blocks;
    }else{  
      let arr_map = this.blocks.map(el => el.block_name);
      console.log(arr_map);
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
