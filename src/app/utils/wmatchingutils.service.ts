import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WmatchingutilsService {

  constructor() { }
  static setWordMatch(data,maindatas){
    console.log(data);
    this.cleanWordMatch(data);
    localStorage.setItem("word_matching",JSON.stringify(data));
  }
  static cleanWordMatch(data) { 
    const block_names = this.getMainBlocks();
    
    for(let i = 0 ;i< data.length ;i ++){
      console.log(data[i])
      const commands = data[i].commands; 
      if(commands || commands != null || commands != undefined || commands.length > 0){ 
        for(let k = 0 ; k < commands.length ; k ++){ 
          if(commands[k].command_type == "block"){
            console.log(commands[k])
            const block_properties = commands[k].block_properties;
            if(block_properties || block_properties != null || block_properties != undefined || block_properties.length > 0){
              for(let l = 0 ; l < block_properties.length ; l ++){
                const block_property = block_properties[l];
                block_property.block_name = block_names[l];
              }
            }
          }
        } 
      }
    }
    console.log(data);
  }
  
  static getMainBlocks() {
    const blocks = JSON.parse(localStorage.getItem("localblocks"));
    let ret =[];
    for(var i = 0 ; i < blocks.length;i++){
      ret.push(blocks[i].block_name);
    }
    return ret ;
  }
  static getWordMatch():any[]{
    let ret = JSON.parse(localStorage.getItem("word_matching"));
    if(ret){
      this.cleanWordMatch(ret);
      return ret;
    }else{
      return null;
    }
  }

  static getBlockProperties(command){ 
    try{
      return command.block_properties;
    }catch(e){
      return null;
    }
  }
}
