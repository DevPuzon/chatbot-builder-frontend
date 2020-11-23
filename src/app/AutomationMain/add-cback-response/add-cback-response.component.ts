import { Component, Input, OnInit } from '@angular/core'; 
import { BlockUtils } from 'src/app/utils/block-utils'; 
@Component({
  selector: 'app-add-cback-response',
  templateUrl: './add-cback-response.component.html',
  styleUrls: ['./add-cback-response.component.scss'],
})
export class AddCbackResponseComponent implements OnInit {

  @Input() maindatas :any; 
  @Input() block_index = 0 ;
  @Input() mini_block_index  = 0 ;    
  @Input() status_title ="resolve";  
  title = "Resolve";
  mini_block :any;  
 
  blocks = new Array();
 
  constructor() { 
  }
  // .quick_replies[this.qreply_i].payload;
  ngOnInit() {   
    this.mini_block = this.maindatas[this.block_index].
    mini_blocks[this.mini_block_index];  
    console.log(this.maindatas);  
    console.log(this.mini_block_index); 
    let localBlocks = [];
    console.log(this.status_title);
    if(this.status_title == "resolve"){
      //resolve block
      localBlocks = this.mini_block.message.resolve_blocks;
      this.title = "Resolve";
    }else{
      //reject block
      localBlocks = this.mini_block.message.reject_blocks; 
      this.title = "Reject";
    }
    console.log(localBlocks);
    if(localBlocks != null || localBlocks != undefined || localBlocks.length == 0){
      this.saveHasBlocks(localBlocks);
    }else{
      this.saveNoBlocks();
    }
    console.log(this.maindatas);  
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
    
  
  onCheckBtnBlock(index){
    if(index != null){
      this.blocks[index].ischecked = !this.blocks[index].ischecked;
    } 
    console.log(this.blocks);  
    
    if(this.status_title == "resolve"){
      //resolve block
      this.maindatas[this.block_index].mini_blocks[this.mini_block_index].message
      .resolve_blocks = this.blocks;
    }else{
      //reject block 
      this.maindatas[this.block_index].mini_blocks[this.mini_block_index].message
      .reject_blocks = this.blocks;
    }
    
    BlockUtils.setLocalBlocks(this.maindatas);
  } 
}
