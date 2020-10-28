import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatbotFunc{

  constructor() { }
  
  static genText(text) {
    let response = { 
      "type":"text-only",
      "message":{
        "text":text
      }
    }; 
    return response;
  }

  static genImageTemplate(image_url) {
      let response = {
        type:"image-only",
        message:{
          attachment: {
              type: "image",
              payload: {
                  url: image_url
              }
          }
        }
      } 
      return response;
  }

  static genButtonTemplate(text, buttons) {
      let response = {
        type:"button-text-only",
        message:{
          attachment: {
              type: "template",
              payload: {
                  template_type: "button",
                  text: text,
                  buttons: buttons
              }
          }
        }
      } 
      return response; 
  }
  
  static genCarousel(elements) {
    // = [{ title: 'title', subtitle: 'subtitle', image_url: 'image_url', buttons:[{ type:'web_url', url:'url',payload:'payload', title:'title' }] } ]
    let response = {
      type:"carousel-only",
      message:{
        attachment: {
            type: "template",
            payload: {
                template_type: "generic",
                elements: elements
            }
        }
      }
    }  
    return response;
  } 
 
}
