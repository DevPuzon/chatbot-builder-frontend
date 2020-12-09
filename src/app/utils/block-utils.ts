import { Injectable } from '@angular/core';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class BlockUtils {

  constructor() { }

  static getLocalBlocks():any[]{
    let ret ; 
    if(localStorage.getItem("localblock_length") == null || 
    localStorage.getItem("localblock_length") == "" || localStorage.getItem("localblock_length") 
    == undefined){
      return null;
    }
    const length =parseInt(localStorage.getItem("localblock_length"));
    let locablocks = new Array();
    for(let i = 0 ; i <  length ; i ++){
      locablocks.push(JSON.parse(localStorage.getItem("localblock_"+i)));
    }
    ret = locablocks;
    // ret = this.reBtnsPayloadParse(JSON.parse(localStorage.getItem("localblocks")))
    this.cleanBlocks(ret); 
    return  ret;
  }
   
  static setLocalBlocks(mblocks){  
    console.log("setLocalBlocks");
    return new Promise<any>((resolve)=>{ 
      for(let i = 0 ; i <  mblocks.length ;i++){
        const block_name = mblocks[i].block_name; 
        if(block_name == ""){
          mblocks[i].block_name = i+ ". Block";
        }
        const hasBlockIndex= mblocks.findIndex(o => o.block_name === block_name);  
        if(hasBlockIndex!= i && hasBlockIndex!= -1){
          mblocks[i].block_name = block_name +" : copy";
        }
        localStorage.setItem("localblock_"+i,JSON.stringify(mblocks[i])); 
      }   
      localStorage.setItem("localblock_length",mblocks.length); 
      resolve();
    })
    // return mblocks;
  }
  static cleanBlocks(mblocks) { 
    const block_names  = this.getMainBlocks(mblocks);
    mblocks = this.getPrettyBlocks(block_names,mblocks); 
  }
  
  static addcleanBlocks(mblocks) { 
    const block_names  = this.getMainBlocks(mblocks);
    mblocks = this.addPrettyBlocks(block_names,mblocks); 
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
  static addPrettyBlocks(block_names: any[], mblocks: any) {
    let ret = mblocks;
    for(var i = 0 ; i < ret.length;i++){
      const mini_blocks = ret[i].mini_blocks;
      for(var j = 0 ; j < mini_blocks.length;j++){
        const mini_block = mini_blocks[j];
        if(mini_block.type == "button-text-only"){
          this.addBtbTextBlocks(mini_block,block_names);
        }
        if(mini_block.type == "carousel-only"){
          this.addCarBlocks(mini_block,block_names);
        }
        if(mini_block.type == "quickreply-only"){
          this.addQRepBlocks(mini_block,block_names);
        }
        if(mini_block.type == "livechat-only"){
          this.addLChatBlocks(mini_block,block_names);
        }
        if(mini_block.type == "cback-only"){
          this.addCbackBlocks(mini_block,block_names);
        }
      }
    } 
    return ret
  }
  static fixCbackBlocks(mini_block,block_names) {  
    const resolve_blocks = mini_block.message.resolve_blocks;
    if(resolve_blocks || resolve_blocks != null || resolve_blocks != undefined || resolve_blocks.length > 0){
      
      for(let l = 0 ; l < resolve_blocks.length ; l ++){ 
        const block_property= resolve_blocks[l]; 
        if(resolve_blocks[l]){
          const block_property = resolve_blocks[l+1];  
          if(block_property){   
            if(block_names[l] == block_property.block_name  ){ 
              resolve_blocks.splice(l,1);
            }
          } 
          else if(block_names.length  < resolve_blocks.length){ 
            resolve_blocks.splice(resolve_blocks.length-1,1);
          }
          if(block_names[l]){
            resolve_blocks[l].block_name = block_names[l];
          } 
        }  
      }  
    }
    const reject_blocks = mini_block.message.reject_blocks;
    if(reject_blocks || reject_blocks != null || reject_blocks != undefined || reject_blocks.length > 0){
       
      for(let l = 0 ; l < reject_blocks.length ; l ++){ 
        const block_property= reject_blocks[l];
        
        if(reject_blocks[l]){
          const block_property = reject_blocks[l+1];  
          if(block_property){   
            if(block_names[l] == block_property.block_name  ){ 
              reject_blocks.splice(l,1);
            }
          } 
          else if(block_names.length  < reject_blocks.length){ 
            reject_blocks.splice(reject_blocks.length-1,1);
          }
          if(block_names[l]){
            reject_blocks[l].block_name = block_names[l];
          } 
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
          
          for(let l = 0 ; l < blocks.length ; l ++){ 
            const block_property= blocks[l];
            
            if(blocks[l]){
              const block_property = blocks[l+1];  
              if(block_property){   
                if(block_names[l] == block_property.block_name  ){ 
                  blocks.splice(l,1);
                }
              } 
              else if(block_names.length  < blocks.length){ 
                blocks.splice(blocks.length-1,1);
              }
              if(block_names[l]){
                blocks[l].block_name = block_names[l];
              } 
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
           
          for(let l = 0 ; l < payloads.length ; l ++){ 
            const block_property= payloads[l];
            
            if(payloads[l]){
              const block_property = payloads[l+1];  
              if(block_property){   
                if(block_names[l] == block_property.block_name  ){ 
                  payloads.splice(l,1);
                }
              } 
              else if(block_names.length  < payloads.length){ 
                payloads.splice(payloads.length-1,1);
              }
              if(block_names[l]){
                payloads[l].block_name = block_names[l];
              } 
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
            if(buttons[l].type != "web_url"){
              if(payloads || payloads != null || payloads != undefined || payloads.length > 0){ 
                 
                for(let m= 0 ; m < payloads.length ; m ++){ 
                  const block_property= payloads[m];
                  
                  if(payloads[m]){
                    const block_property = payloads[m+1];  
                    if(block_property){   
                      if(block_names[m] == block_property.block_name  ){ 
                        payloads.splice(m,1);
                      }
                    } 
                    else if(block_names.length  < payloads.length){ 
                      payloads.splice(payloads.length-1,1);
                    }
                    if(block_names[m]){
                      payloads[m].block_name = block_names[m];
                    } 
                  }  
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
        if(buttons[k].type != "web_url"){
          const payloads = buttons[k].payload;   
          if(payloads || payloads != null || payloads != undefined || payloads.length > 0){   
            for(let l = 0 ; l < payloads.length ; l ++){ 
              const block_property= payloads[l];
              
              if(payloads[l]){
                const block_property = payloads[l+1];  
                if(block_property){   
                  if(block_names[l] == block_property.block_name  ){ 
                    payloads.splice(l,1);
                  }
                } 
                else if(block_names.length  < payloads.length){ 
                  payloads.splice(payloads.length-1,1);
                }
                if(block_names[l]){
                  payloads[l].block_name = block_names[l];
                } 
              }  
            } 
          }
        } 
      }
    }
  }
  
  static addCbackBlocks(mini_block,block_names) {  
    const resolve_blocks = mini_block.message.resolve_blocks;
    if(resolve_blocks || resolve_blocks != null || resolve_blocks != undefined || resolve_blocks.length > 0){
      for(let q = 0 ; q < block_names.length ;q ++){
        if(resolve_blocks[q]){ 
          const isch =resolve_blocks[q].ischecked;
          resolve_blocks[q] = {
            block_index : q,
            block_name : block_names[q],
            ischecked : isch
          }
        }else{
          resolve_blocks[q] = {
            block_index : q,
            block_name : block_names[q],
            ischecked : false
          }
        }
      } 
    }
    const reject_blocks = mini_block.message.reject_blocks;
    if(reject_blocks || reject_blocks != null || reject_blocks != undefined || reject_blocks.length > 0){
 
      for(let q = 0 ; q < block_names.length ;q ++){
        if(reject_blocks[q]){ 
          const isch =reject_blocks[q].ischecked;
          reject_blocks[q] = {
            block_index : q,
            block_name : block_names[q],
            ischecked : isch
          }
        }else{
          reject_blocks[q] = {
            block_index : q,
            block_name : block_names[q],
            ischecked : false
          }
        }
      } 
    }
  }
  static addLChatBlocks(mini_block,block_names) { 
    const buttons= mini_block.message.attachment.payload.buttons; 
    
    if(buttons || buttons != null || buttons != undefined || buttons.length > 0){
      for(let k = 0 ; k < buttons.length;k++){
        const blocks = buttons[k].payload.blocks; 
        if(blocks || blocks != null || blocks != undefined || blocks.length > 0){  
          for(let q = 0 ; q < block_names.length ;q ++){
            if(blocks[q]){ 
              const isch =blocks[q].ischecked;
              blocks[q] = {
                block_index : q,
                block_name : block_names[q],
                ischecked : isch
              }
            }else{
              blocks[q] = {
                block_index : q,
                block_name : block_names[q],
                ischecked : false
              }
            }
          } 
        }
      }
    }
  }
  static addQRepBlocks(mini_block,block_names) { 
    const quick_replies  = mini_block.message.quick_replies;
    if(quick_replies || quick_replies != null || quick_replies != undefined || quick_replies.length > 0){
      for(let k =0 ; k < quick_replies.length;k++){
        const payloads =quick_replies[k].payload; 
        if(payloads || payloads != null || payloads != undefined || payloads.length > 0){ 
          for(let q = 0 ; q < block_names.length ;q ++){
            if(payloads[q]){ 
              const isch =payloads[q].ischecked;
              payloads[q] = {
                block_index : q,
                block_name : block_names[q],
                ischecked : isch
              }
            }else{
              payloads[q] = {
                block_index : q,
                block_name : block_names[q],
                ischecked : false
              }
            }
          }  
        }
      }
    }
  }
  static addCarBlocks(mini_block,block_names) {
    const elements = mini_block.message.attachment.payload.elements;
    if(elements || elements != null || elements != undefined || elements.length > 0){
      for(let k = 0 ; k < elements.length;k++){
        const buttons = elements[k].buttons; 
        if(buttons || buttons != null || buttons != undefined || buttons.length > 0){
          for(let l= 0 ; l < buttons.length;l++){
            const payloads = buttons[l].payload;  
            if(buttons[l].type != "web_url"){
              if(payloads || payloads != null || payloads != undefined || payloads.length > 0){ 
                
                for(let q = 0 ; q < block_names.length ;q ++){
                  if(payloads[q]){ 
                    const isch =payloads[q].ischecked;
                    payloads[q] = {
                      block_index : q,
                      block_name : block_names[q],
                      ischecked : isch
                    }
                  }else{
                    payloads[q] = {
                      block_index : q,
                      block_name : block_names[q],
                      ischecked : false
                    }
                  }
                } 
              }
            }
          }
        }
      }
    }
  }
  static addBtbTextBlocks(mini_block,block_names) {
    const buttons = mini_block.message.attachment.payload.buttons;
    if(buttons || buttons != null || buttons != undefined || buttons.length > 0){
      for(var k = 0 ; k < buttons.length ; k++){
        if(buttons[k].type != "web_url"){
          const payloads = buttons[k].payload;   
          if(payloads || payloads != null || payloads != undefined || payloads.length > 0){  
            for(let q = 0 ; q < block_names.length ;q ++){
              if(payloads[q]){ 
                const isch =payloads[q].ischecked;
                payloads[q] = {
                  block_index : q,
                  block_name : block_names[q],
                  ischecked : isch
                }
              }else{
                payloads[q] = {
                  block_index : q,
                  block_name : block_names[q],
                  ischecked : false
                }
              }
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
    let mini_blocks = blocks[block_index].mini_blocks[mini_block_index];
    if(mini_blocks.type != 'button-text-only'){
      return null;
    } 
    let ret = null; 
    let btns = mini_blocks.message.attachment.payload.buttons[button_index];
    if(btns == undefined || btns == null){
      return null;
    }
 
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
      if(obj[propName].url === null || obj[propName].url === undefined || obj[propName].url === ""){
        delete obj[propName];
      }
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "" || obj[propName].length === 0) {
        delete obj[propName];
      }
    }
  }
}
