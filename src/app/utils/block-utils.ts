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
    ret = JSON.parse(localStorage.getItem("localblocks"));
    // ret = this.reBtnsPayloadParse(JSON.parse(localStorage.getItem("localblocks")))
    this.cleanBlocks(ret);
    console.log(ret);
    return  ret;
  }
   
  static setLocalBlocks(mblocks){   
    for(let i = 0 ; i <  mblocks.length ;i++){
      const block_name = mblocks[i].block_name; 
      if(block_name == ""){
        mblocks[i].block_name = i+ ". Block";
      }
      const hasBlockIndex= mblocks.findIndex(o => o.block_name === block_name);  
      if(hasBlockIndex!= i && hasBlockIndex!= -1){
        mblocks[i].block_name = block_name +" : copy";
      }
    } 
    this.cleanBlocks(mblocks);
    localStorage.setItem("localblocks",JSON.stringify(mblocks)); 
    return mblocks;
  }
  static cleanBlocks(mblocks) { 
    const block_names  = this.getMainBlocks(mblocks);
    mblocks = this.getPrettyBlocks(block_names,mblocks); 
  }
  static getPrettyBlocks(block_names: any[], mblocks: any) {
    let ret = mblocks;
    for(var i = 0 ; i < ret.length;i++){
      const mini_blocks = ret[i].mini_blocks;
      for(var j = 0 ; j < mini_blocks.length;j++){
        const mini_block = mini_blocks[j];
        if(mini_block.type == "button-text-only"){
          this.fixBtbTextBlocks(mini_block,block_names);
        }
        if(mini_block.type == "carousel-only"){
          this.fixCarBlocks(mini_block,block_names);
        }
        if(mini_block.type == "quickreply-only"){
          this.fixQRepBlocks(mini_block,block_names);
        }
        if(mini_block.type == "livechat-only"){
          this.fixLChatBlocks(mini_block,block_names);
        }
        if(mini_block.type == "cback-only"){
          this.fixCbackBlocks(mini_block,block_names);
        }
      }
    } 
    return ret
  }
  static fixCbackBlocks(mini_block,block_names) {  
    const resolve_blocks = mini_block.message.resolve_blocks;
    if(resolve_blocks || resolve_blocks != null || resolve_blocks != undefined || resolve_blocks.length > 0){
      for(let k = 0 ; k  < resolve_blocks.length; k++){
        const resolve_block = resolve_blocks[k];
        if(block_names[k]){
          resolve_block.block_name = block_names[k]; 
        }else{
          resolve_blocks.splice(k,1);
        }
      }
    }
    const reject_blocks = mini_block.message.reject_blocks;
    if(reject_blocks || reject_blocks != null || reject_blocks != undefined || reject_blocks.length > 0){
      for(let k = 0 ; k  < reject_blocks.length; k++){
        const reject_block = reject_blocks[k];
        if(block_names[k]){
          reject_block.block_name = block_names[k]; 
        }else{
          reject_blocks.splice(k,1);
        }
      }
    }
  }
  static fixLChatBlocks(mini_block,block_names) { 
    const buttons= mini_block.message.attachment.payload.buttons; 
    
    if(buttons || buttons != null || buttons != undefined || buttons.length > 0){
      for(let k = 0 ; k < buttons.length;k++){
        const blocks = buttons[k].payload.blocks; 
        if(blocks || blocks != null || blocks != undefined || blocks.length > 0){
          for(let l = 0 ; l < blocks.length;l++){
            const block = blocks[l]; 
            if(block_names[l]){
              block.block_name = block_names[l];
            }else{
              blocks.splice(l,1);
            }
          }
        }
      }
    }
  }
  static fixQRepBlocks(mini_block,block_names) { 
    const quick_replies  = mini_block.message.quick_replies;
    if(quick_replies || quick_replies != null || quick_replies != undefined || quick_replies.length > 0){
      for(let k =0 ; k < quick_replies.length;k++){
        const payloads =quick_replies[k].payload; 
        if(payloads || payloads != null || payloads != undefined || payloads.length > 0){
          for(let l = 0 ;l<payloads.length ;l++){
            const payload = payloads[l]; 
            if(block_names[l]){
              payload.block_name = block_names[l];
            }else{
              payloads.splice(l,1);
            }
          }
        }
      }
    }
  }
  static fixCarBlocks(mini_block,block_names) {
    const elements = mini_block.message.attachment.payload.elements;
    if(elements || elements != null || elements != undefined || elements.length > 0){
      for(let k = 0 ; k < elements.length;k++){
        const buttons = elements[k].buttons; 
        if(buttons || buttons != null || buttons != undefined || buttons.length > 0){
          for(let l= 0 ; l < buttons.length;l++){
            const payloads = buttons[l].payload; 
            if(payloads || payloads != null || payloads != undefined || payloads.length > 0){
              for(let m =0;m<payloads.length;m++){
                const payload = payloads[m]; 
                if(block_names[m]){
                  payload.block_name = block_names[m];
                }else{
                  payloads.splice(m,1);
                }
              }
            }
          }
        }
      }
    }
  }
  static fixBtbTextBlocks(mini_block,block_names) {
    const buttons = mini_block.message.attachment.payload.buttons;
    if(buttons || buttons != null || buttons != undefined || buttons.length > 0){
      for(var k = 0 ; k < buttons.length ; k++){
        const payloads = buttons[k].payload; 
        if(payloads || payloads != null || payloads != undefined || payloads.length > 0){
          for( var l = 0 ; l < payloads.length ; l++){
            const payload = payloads[l]; 
            if(block_names[l]){
              payload.block_name = block_names[l];
            }else{
              payloads.splice(l,1);
            }
          }
        }
      }
    }
  }
  
  static getMainBlocks(blocks) {
    let ret =[];
    for(var i = 0 ; i < blocks.length;i++){
      ret.push(blocks[i].block_name);
    }
    return ret ;
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
