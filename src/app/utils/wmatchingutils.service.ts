import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WmatchingutilsService {

  constructor() { }
  static setWordMatch(data,maindatas){ 
    this.cleanWordMatch(data);
    localStorage.setItem("word_matching",JSON.stringify(data));
  }
  static cleanWordMatch(data) { 
    const block_names = this.getMainBlocks();  
    console.log(block_names);
    if(!data){
      return false;
    }
    if(!block_names){
      return false;
    }
    if( block_names.length == 0){
      return false;
    } 
    console.log('block_names');
    console.log(data);
    for(let i = 0 ;i< data.length ;i ++){ 
      const commands = data[i].commands; 
      if(commands || commands != null || commands != undefined || commands.length > 0){ 
        for(let k = 0 ; k < commands.length ; k ++){ 
          if(commands[k].command_type == "block"){ 
            const block_properties = commands[k].block_properties;
            if(block_properties || block_properties != null || block_properties != undefined || block_properties.length > 0){
              if(block_properties.find(o=>o.ischecked === true)){  
                for(let l = 0 ; l < block_properties.length ; l ++){ 
                  const block_property= block_properties[l];
                  console.log(block_property); 
                  if(block_properties[l]){
                    const block_property = block_properties[l+1]; 
                    console.log(block_property);
                    console.log(block_names.length);
                    console.log(block_properties.length);
                    if(block_property){   
                      if(block_names[l] == block_property.block_name  ){ 
                        block_properties.splice(l,1);
                      }
                    } 
                    else if(block_names.length  < block_properties.length){ 
                      block_properties.splice(block_properties.length-1,1);
                    }
                    if(block_names[l]){
                      block_properties[l].block_name = block_names[l];
                    } 
                  }  
                }
                if(!block_properties.find(o=>o.ischecked === true)){
                  commands.splice(k,1);
                }
              }else{
                commands.splice(k,1);
              }
            }
          }
        } 
      }
    } 
    localStorage.setItem("word_matching",JSON.stringify(data));  
  }
  static addcleanWordMatch(data){
    const block_names = this.getMainBlocks();  
    console.log(block_names);
    if(!data){
      return false;
    }
    if(!block_names){
      return false;
    }
    if( block_names.length == 0){
      return false;
    } 
    console.log('block_names');
    console.log(data);
    for(let i = 0 ;i< data.length ;i ++){ 
      const commands = data[i].commands; 
      if(commands || commands != null || commands != undefined || commands.length > 0){ 
        for(let k = 0 ; k < commands.length ; k ++){ 
          if(commands[k].command_type == "block"){ 
            const block_properties = commands[k].block_properties;
            if(block_properties || block_properties != null || block_properties != undefined || block_properties.length > 0){
              if(block_properties.find(o=>o.ischecked === true)){ 
                for(let q = 0 ; q < block_names.length ;q ++){
                  if(block_properties[q]){ 
                    const isch =block_properties[q].ischecked;
                    block_properties[q] = {
                      block_index : q,
                      block_name : block_names[q],
                      ischecked : isch
                    }
                  }else{
                    block_properties[q] = {
                      block_index : q,
                      block_name : block_names[q],
                      ischecked : false
                    }
                  }
                } 
                if(!block_properties.find(o=>o.ischecked === true)){
                  commands.splice(k,1);
                }
              }else{
                commands.splice(k,1);
              }
            }
          }
        } 
      }
    } 
    localStorage.setItem("word_matching",JSON.stringify(data));  
  }
  
  static getMainBlocks() {
    const blocks = JSON.parse(localStorage.getItem("localblocks"));
    if(!blocks){
      return null;
    }
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
