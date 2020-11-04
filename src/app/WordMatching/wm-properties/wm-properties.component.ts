import { Component, Input, OnInit } from '@angular/core';
import { BlockUtils } from 'src/app/utils/block-utils';   
import { WmatchingutilsService } from 'src/app/utils/wmatchingutils.service';
@Component({
  selector: 'app-wm-properties',
  templateUrl: './wm-properties.component.html',
  styleUrls: ['./wm-properties.component.scss'],
})
export class WmPropertiesComponent implements OnInit {
  @Input() wmatchingdtas_i = 0;  
  @Input() command_i = 0;  
  @Input() wmatchingdtas  = new Array();
  wmatchingdta :any;
  maindatas= new Array(); 
  
  constructor() { }

  ngOnInit() {
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
    Object.assign(this.wmatchingdta.commands[this.command_i],{block_properties:[]});
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
    if(index != null){  
      let boolGl = !this.blocks[index].ischecked;  
      this.blocks[index].ischecked = boolGl;
      this.wmatchingdtas[this.wmatchingdtas_i].commands[this.command_i].block_properties = this.blocks;
      this.wmatchingdtas[this.wmatchingdtas_i].commands[this.command_i].command_type= "block"; 
    }
 
    WmatchingutilsService.setWordMatch(this.wmatchingdtas);
    console.log(JSON.stringify(this.wmatchingdtas));
  }

  kMessage(txt_message){
    console.log(txt_message) ;
    this.wmatchingdtas[this.wmatchingdtas_i].commands[this.command_i].block_properties = this.blocks;
    this.wmatchingdtas[this.wmatchingdtas_i].commands[this.command_i].command_type= "text_message"; 
  }
}
