import { Injectable } from '@angular/core';
import { IndexedDBAngular } from 'indexeddb-angular';
import { BlockUtils } from './block-utils';

@Injectable({
  providedIn: 'root'
})
export class WmatchingutilsService {

  constructor() { }
  static setWordMatch(data,maindatas){ 
    this.cleanWordMatch(data);
    this.pureSetWordMatch( data);
  }

  static async cleanWordMatch(data) { 
    const block_names = await this.getMainBlocks();     
    if(!data){
      return false;
    }
    if(!block_names){
      return false;
    }
    if( block_names.length == 0){
      return false;
    }  
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
                  if(block_properties[l]){
                    const block_property = block_properties[l+1];  
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
    this.pureSetWordMatch( data);
  }
  static async addcleanWordMatch(data){
    const block_names = await this.getMainBlocks();   
    if(!data){
      return false;
    }
    if(!block_names){
      return false;
    }
    if( block_names.length == 0){
      return false;
    }  
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
    this.pureSetWordMatch( data);
  }
  
  static async getMainBlocks() {
    const blocks = await BlockUtils.getLocalBlocks();
    if(!blocks){
      return null;
    }
    let ret =[];
    for(var i = 0 ; i < blocks.length;i++){
      ret.push(blocks[i].block_name);
    }
    return ret ;
  }
  static async getWordMatch():Promise<any[]>{
    let ret = this.pureGetWordMatch();
    if(ret){
      await this.cleanWordMatch(ret);
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

  static db = new IndexedDBAngular('rti_db_word_matching', 1);
  static pureGetWordMatch(){
    // const length = parseInt(localStorage.getItem("word_matching_length"));
    // let ret = new Array();
    // for(let i = 0 ; i < length ; i ++){
    //   ret.push(JSON.parse(localStorage.getItem("word_matching_"+i)));
    // }
    // if(ret){ 
    //   return ret;
    // }else{
    //   return null;
    // }
    
    return new Promise<any>((resolve)=>{ 
      
      this.db.createStore(1,function (dbs){ 
        dbs.currentTarget.result.createObjectStore('word_matching'); 
      }).then(()=>{   
        this.db.getByKey('word_matching',0).then((snap)=>{
          console.log(snap);
          snap = JSON.parse(snap);
          resolve(snap);
        })
      }).catch(err=>{ 
        console.log(err);
      })  
    })
  }
  static pureSetWordMatch(word_matching){
    // word_matching = JSON.parse(word_matching);
    // for(let i = 0 ; i < word_matching.length ; i ++){
    //   localStorage.setItem("word_matching_"+i,JSON.stringify(word_matching[i]));
    // }
    // localStorage.setItem("word_matching_length",word_matching.length);
    
    return new Promise<any>(async (resolve)=>{   
      word_matching = JSON.stringify(word_matching);
      this.db.createStore(1,function (dbs){ 
        dbs.currentTarget.result.createObjectStore('word_matching'); 
      }).then(()=>{  
        const dep_version= localStorage.getItem("dep_version");
        if(dep_version){
          this.db.update('word_matching',word_matching,0);
        }else{
          this.db.add('word_matching',word_matching,0);
        }
        this.db.getByKey('word_matching',0).then((snap)=>{ 
          resolve();
        })
      }).catch(err=>{ 
        console.log(err);
      })  
    })
  }
}
