import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlockUtils {

  constructor() { }

  static getLocalBlocks():any[]{
    let ret ; 
    if(localStorage.getItem("localblocks") == null || localStorage.getItem("localblocks") == "" || localStorage.getItem("localblocks") == undefined){
      return null;
    }
    ret = JSON.parse(localStorage.getItem("localblocks"))
    // ret = this.reBtnsPayloadParse(JSON.parse(localStorage.getItem("localblocks")))
    console.log(ret);
    return  ret;
  }
   
  static setLocalBlocks(mblocks){   
    let b = JSON.parse(JSON.stringify(mblocks));
    // localStorage.setItem("localblocks",JSON.stringify(this.reBtnsPayloadString(b)));
    localStorage.setItem("localblocks",JSON.stringify(b));
    // console.log(JSON.stringify(mblocks));
    // return this.reBtnsPayloadParse(mblocks); 
  }

  static getTxtButtonBlocks(block_index,mini_block_index,button_index){
    button_index = button_index ;
    let blocks ;
    blocks = localStorage.getItem("localblocks");
    if(blocks == "" || blocks == null ){
      return null;
    }
    blocks = JSON.parse(blocks);
    console.log(mini_block_index);
    let mini_blocks = blocks[block_index].mini_blocks[mini_block_index];
    if(mini_blocks.type != 'button-text-only'){
      return null;
    } 
    let ret = null;
    console.log(mini_blocks);
    console.log(button_index);
    let btns = mini_blocks.message.attachment.payload.buttons[button_index];
    if(btns == undefined || btns == null){
      return null;
    }

    console.log(mini_blocks.message.attachment.payload.buttons[button_index].payload);
    ret = mini_blocks.message.attachment.payload.buttons[button_index].payload;
    return ret;
  } 

  static getCarButtonBlocks(block_index,mini_block_index,element_i,button_index){
    button_index = button_index ;
    let blocks ;
    blocks = localStorage.getItem("localblocks");
    if(blocks == "" || blocks == null ){
      return null;
    }
    blocks = JSON.parse(blocks);
    console.log(mini_block_index);
    let mini_blocks = blocks[block_index].mini_blocks[mini_block_index];
    if(mini_blocks.type != 'carousel-only'){
      return null;
    } 
    let ret = null;
    console.log(mini_blocks);
    console.log(button_index);
    let btns = mini_blocks.message.attachment.payload.elements[element_i].buttons[button_index];
    if(btns == undefined || btns == null){
      return null;
    }

    console.log(btns);
    ret = mini_blocks.message.attachment.payload.elements[element_i].buttons[button_index].payload;
    return ret;
  } 
  static getQReplyButtonBlocks(block_index,mini_block_index,qreply_i){
    let blocks ;
    blocks = localStorage.getItem("localblocks");
    if(blocks == "" || blocks == null ){
      return null;
    }
    blocks = JSON.parse(blocks);
    console.log(mini_block_index);
    let mini_blocks = blocks[block_index].mini_blocks[mini_block_index];
    if(mini_blocks.type != 'quickreply-only'){
      return null;
    } 
    let ret = null;
    console.log(mini_blocks); 
    let btns = mini_blocks.message.quick_replies[qreply_i].payload; 
    if(btns == undefined || btns == null || btns.length <= 0){
      return null;
    }

    console.log(btns);
    ret = mini_blocks.message.quick_replies[qreply_i].payload;
    return ret;
  } 
  // static reBtnsPayloadParse(dtas){ 
  //   let b_dtas = dtas;
  //   // let ret : any[];
  //   for(let i =0; i < b_dtas.length; i ++){
  //     let dmini_blocks = b_dtas[i].mini_blocks;
  //     console.log(dmini_blocks);
  //     for(let ii =0; ii < dmini_blocks.length; ii++){ 
  //       let mini_block_type = dmini_blocks[ii].type;
  //       console.log(mini_block_type);
  //       if(mini_block_type == "button-text-only"){
  //         let dbuttons = dmini_blocks[ii].message.attachment.payload.buttons;
         
  //         console.log(dbuttons);
  //         for(let x =0; x < dbuttons.length; x++){
  //           let dtbn= dbuttons[x];
  //           let dtbn_type = dtbn.type;
  //           console.log(dtbn);
  //           console.log(dtbn_type);
  //           if(dtbn_type =="postback"){
  //             console.log(dtbn.payload);
  //             let dtbn_payload = JSON.parse(dtbn.payload);
  //             console.log(dtbn_payload);
  //             dtas[i].mini_blocks[ii].message.attachment.payload.buttons[x].payload = dtbn_payload;
  //           }
  //         }
  //       }
  //     }
  //   }
  //   console.log(dtas);
  //   return dtas;
  // }

  static reBtnsPayloadString(dtas){ 
    let b_dtas = dtas;
    // let ret : any[];
    for(let i =0; i < b_dtas.length; i ++){
      let dmini_blocks = b_dtas[i].mini_blocks;
      for(let ii =0; ii < dmini_blocks.length; ii++){ 
        let mini_block_type = dmini_blocks[ii].type;
        if(mini_block_type == "button-text-only"){
          let dbuttons = dmini_blocks[ii].message.attachment.payload.buttons;
          for(let x =0; x < dbuttons.length; x++){
            let dtbn= dbuttons[x];
            let dtbn_type = dtbn.type;
            if(dtbn_type =="postback"){
              let dtbn_payload = JSON.stringify(dtbn.payload);
              dtas[i].mini_blocks[ii].message.attachment.payload.buttons[x].payload = dtbn_payload;
            }
          }
        }
      }
    }
    console.log(dtas);
    return dtas;
  }

  static isJsonParse(str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return null;
    } 
  }

  static cleanObj(obj){ 
    var propNames = Object.getOwnPropertyNames(obj);
    for (var i = 0; i < propNames.length; i++) {
      var propName = propNames[i]; 
      console.log(obj[propName]); 
      if(obj[propName].url === null || obj[propName].url === undefined || obj[propName].url === ""){
        delete obj[propName];
      }
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "" || obj[propName].length === 0) {
        delete obj[propName];
      }
    }
  }
}
