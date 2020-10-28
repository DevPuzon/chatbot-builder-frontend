import { Injectable } from '@angular/core';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class BlobService {

  constructor() { }
  static URItoBlob(dataURI) {
    let byteString;
    let mimeString;
    let ia;

    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = encodeURI(dataURI.split(',')[1]);
    }
    // separate out the mime component
    mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
  }
  static bitmapToBlob(bitmap){
    return new Promise<any>(async (resolve,reject)=>{
      
      fetch(bitmap)
      .then(r => r.blob()) // yes.. from a Blob to a Blob...
    // ImageBitmap generation  
      .then(createImageBitmap)
    // to Blob
      .then(img => {
        //console.log(img); // ImageBitmap
        return new Promise(res => {
          // create a canvas
          const canvas = document.createElement('canvas');
          // resize it to the size of our ImageBitmap
          canvas.width = img.width;
          canvas.height = img.height;
          // try to get a bitmaprenderer context
          var ctx;
          ctx =canvas.getContext('bitmaprenderer');
          if(ctx) {
            // transfer the ImageBitmap to it
            //console.log('transferFromImageBitmap(img)');
            ctx.transferFromImageBitmap(img);
          }
          else {
            // in case someone supports createImageBitmap only
            // twice in memory...
            //console.log('canvas.getContext');
            canvas.getContext('2d').drawImage(img,0,0);
          }
          // get it back as a Blob
          canvas.toBlob(res);
        });
      })
      .then(blob => {
        //console.log(blob); // Blob
        resolve(blob)
        // var img = document.body.appendChild(new Image());
        // img.src = URL.createObjectURL(blob);
      }).catch(err=>{
        reject(err);
      })
    })
  }
  
  changeRes(){
    return new Promise<any>((resolve)=>{

      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
  
      canvas.width = 32; // target width
      canvas.height = 32; // target height
  
      var image = new Image();
      document.getElementById("original").appendChild(image);
  
      image.onload = function(e) {
          ctx.drawImage(image, 
              0, 0, image.width, image.height, 
              0, 0, canvas.width, canvas.height
          );
          // create a new base64 encoding
          var resampledImage = new Image();
          resampledImage.src = canvas.toDataURL();
          resolve(resampledImage);
          // document.getElementById("resampled").appendChild(resampledImage);
      };
    });
  }


 static resize(file,resize_width){
    return  new Promise<any>((resolve)=>{
       //define the width to resize e.g 600px 
  
    //create a FileReader
    var reader = new FileReader();
  
    //image turned to base64-encoded Data URI.
    reader.readAsDataURL(file);
    // reader.name = item.name;//get the image's name
    // reader.size = file.size; //get the image's size
    reader.onload = event => {
      var img =new Image() ;//create a image 
      //console.log(reader.result.toString()+"s ad")
      img.src = reader.result.toString(); //result is base64-encoded Data URI
      // img.name = event.target.name;//set name (optional)
      // img.size = event.target.size;//set size (optional)
      img.onload = function(el) {
        var elem = document.createElement('canvas');//create a canvas
  
        //scale the image to 600 (width) and keep aspect ratio
        var scaleFactor = resize_width / img.width;
        elem.width = resize_width;
        elem.height = img.height * scaleFactor;
  
        //draw in canvas
        var ctx = elem.getContext('2d');
        ctx.drawImage(img, 0, 0, elem.width, elem.height);
  
        //get the base64-encoded Data URI from the resize image
        var srcEncoded = ctx.canvas.toDataURL();
        resolve(srcEncoded);
        //assign it to thumb src 
  
        /*Now you can send "srcEncoded" to the server and
        convert it to a png o jpg. Also can send
        "el.target.name" that is the file's name.*/
  
      }
      }
    })
  } 
  static getBlobFromUrl(myImageUrl){
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('GET', myImageUrl, true);
        request.responseType = 'blob';
        request.onload = () => {
            resolve(request.response);
        };
        request.onerror = reject;
        request.send();
    })
  }

  static getDataFromBlob(myBlob) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(myBlob);
    })
  }
  static async createFile(url,name){
    let response = await fetch(url);
    let data = await response.blob();
    let metadata = {
      type: 'image/jpeg'
    };
    let file = new File([data], name+".jpg", metadata);
    
    console.log(file);
    // ... do something with the file or return it
    return file;
  }
}
