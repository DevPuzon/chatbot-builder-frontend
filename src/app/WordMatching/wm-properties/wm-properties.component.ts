import { Component, Input, OnInit } from '@angular/core';
import { BlockUtils } from 'src/app/utils/block-utils'; 
import { WordmatchingutilsService } from 'src/app/Utils/wordmatchingutils.service';
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
    this.wmatchingdta = this.wmatchingdtas[this.wmatchingdtas_i];
    this.maindatas = BlockUtils.getLocalBlocks();
    console.log(this.wmatchingdta);
    
    let local_block_p =WordmatchingutilsService.getBlockProperties(this.wmatchingdta.commands[this.command_i]);
    if(local_block_p.length == 0){
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
      this.wmatchingdta.commands[this.command_i].block_properties.push({
        block_name:this.maindatas[i].block_name,
        block_index:i,
        ischecked:false
      })
    }
    this.blocks = this.wmatchingdta.commands[0].block_properties;
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
    }
    console.log(this.blocks);
  }
  onCheckBtnBlock(index){ 
    if(index != null){
      this.blocks[index].ischecked = !this.blocks[index].ischecked;
      this.wmatchingdtas[this.wmatchingdtas_i].commands[this.command_i].block_properties[index].ischecked = !this.wmatchingdtas[this.wmatchingdtas_i].commands[this.command_i].block_properties[index].ischecked;
    }
    console.log( this.wmatchingdtas[this.wmatchingdtas_i].commands[this.command_i].block_properties[index].ischecked);
 
    WordmatchingutilsService.setWordMatch(this.wmatchingdtas);
  }
}
