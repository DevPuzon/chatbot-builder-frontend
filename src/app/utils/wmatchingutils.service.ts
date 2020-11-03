import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WmatchingutilsService {

  constructor() { }
  static setWordMatch(data){
    localStorage.setItem("word_matching",JSON.stringify(data));
  }
  static getWordMatch():any[]{
    let ret = JSON.parse(localStorage.getItem("word_matching"));
    if(ret){
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
