import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockUtils } from '../utils/block-utils';
import { ChatbotFunc } from '../utils/chatbot-func';


@Component({
  selector: 'app-add-quickreply',
  templateUrl: './add-quickreply.component.html',
  styleUrls: ['./add-quickreply.component.scss'],
})
export class AddQuickreplyComponent implements OnInit {
  @Input() maindatas :any; 
  @Input() block_index = 0 ;
  @Input() mini_block_index  = 0 ;  
  @Input() qreply_i  = 0 ;   
  @Input() btn_name ="";  
  
  mini_block :any;  
 
  blocks = new Array();
 
  constructor(private formBuilder:FormBuilder) { 
  }
  // .quick_replies[this.qreply_i].payload;
  ngOnInit() {   
    this.mini_block = this.maindatas[this.block_index].
    mini_blocks[this.mini_block_index]; 

    console.log(this.maindatas); 

    console.log(this.mini_block_index); 
    let localBlocks = BlockUtils.getQReplyButtonBlocks(this.block_index,this.mini_block_index,this.qreply_i);
    
    console.log(localBlocks);
    if(localBlocks != null || localBlocks != undefined){
      this.saveHasBlocks(localBlocks);
    }else{
      this.saveNoBlocks();
    }
    console.log(this.maindatas); 
    //BlockUtils.setLocalBlocks(this.maindatas); 
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
    if(this.maindatas[this.block_index].mini_blocks[this.mini_block_index].message.quick_replies){
      this.maindatas[this.block_index].mini_blocks[this.mini_block_index]
    .message.quick_replies[this.qreply_i].title = this.btn_name; 
      //BlockUtils.setLocalBlocks(this.maindatas);
    } 
  }
  
  onCheckBtnBlock(index){
    if(index != null){
      this.blocks[index].ischecked = !this.blocks[index].ischecked;
    } 
    console.log(this.blocks);  
   
    this.maindatas[this.block_index].mini_blocks[this.mini_block_index]
    .message.quick_replies[this.qreply_i]  =
    {
      content_type:"text",
      payload:this.blocks,
      title:this.btn_name
    } 

    console.log(JSON.stringify(this.maindatas));
    BlockUtils.setLocalBlocks(this.maindatas); 
  } 
}
