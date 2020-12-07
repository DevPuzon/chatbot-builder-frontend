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
  show_blocks = new Array();
 
  constructor() { 
  }
  // .quick_replies[this.qreply_i].payload;
  ngOnInit() {   
    this.mini_block = this.maindatas[this.block_index].
    mini_blocks[this.mini_block_index];   
    let localBlocks = []; 
    if(this.status_title == "resolve"){
      //resolve block
      localBlocks = this.mini_block.message.resolve_blocks;
      this.title = "Resolve";
    }else{
      //reject block
      localBlocks = this.mini_block.message.reject_blocks; 
      this.title = "Reject";
    } 
    if(localBlocks != null || localBlocks != undefined || localBlocks.length == 0){
      this.saveHasBlocks(localBlocks);
    }else{
      this.saveNoBlocks();
    }  
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
    
  
  onCheckBtnBlock(block_name){
    const index = this.blocks.findIndex(o=>o.block_name === block_name);
    if(index != null){
      this.blocks[index].ischecked = !this.blocks[index].ischecked;
    }  
    
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
