import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CryptService } from './crypt.service';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpService {

  // private base  ="https://fbchatbotexample012.herokuapp.com/"; 
  private base  ="http://18.140.245.243:20184/api/"; 
  
  // private base  ="http://192.168.0.108:8000/";  
  private token  = "";
  constructor(private http:HttpClient,
    private crypt:CryptService) { 
    this.token ="Bearer "+ crypt.decryptData(localStorage.getItem("-=[]sultada-token"));
  }
  get(ctrl){ 
    const url = this.base+ctrl;
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache')
    .set('Authorization', this.token) 
    .set('content-type', 'application/json')  
    return this.http
    .get(url, { headers: headers })
  }
  getNoBase(ctrl){ 
    const url = ctrl;
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache')
    .set('Authorization', this.token) 
    .set('content-type', 'application/json')  
    return this.http
    .get(url, { headers: headers })
  }
  getId(ctrl,id){
    const url = this.base+ctrl+"/"+id;
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache')
    .set('Authorization', this.token)
    .set('content-type', 'application/json') ;
    console.log(url);
    return this.http
    .get(url, { headers: headers })
  } 

  post(ctrl,body){
    const url = this.base+ctrl;
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache')
    .set('Authorization', this.token)
    .set('content-type', 'application/json') 
    console.log("post");
    console.log(body);
    console.log(url);
    return this.http
    .post(url,body, { headers: headers })
  }
  put(ctrl,id,body){
    const url = this.base+ctrl+"/"+id;
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache')
    .set('Authorization', this.token)
    .set('content-type', 'application/json') 
    console.log(body);
    console.log(url);
    return this.http
    .put(url,body, { headers: headers })
  }
  
  del(ctrl,id){
    const url = this.base+ctrl+"/"+id;
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache')
    .set('Authorization', this.token)
    .set('content-type', 'application/json') 
    return this.http
    .delete(url, { headers: headers })
  } 

  getNoToken(ctrl){ 
    const url = this.base+ctrl;
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache') 
    .set('content-type', 'application/json') 
    console.log(url); 
    return this.http
    .get(url, { headers: headers })
  }
  
  delNoToken(ctrl,id){
    const url = this.base+ctrl+"/"+id;
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache') 
    .set('content-type', 'application/json') 
    console.log(url); 
    return this.http
    .delete(url, { headers: headers })
  }
  
  postNoToken(ctrl,body){
    const url = this.base+ctrl;
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache') 
    .set('content-type', 'application/json') 
    console.log("post");
    console.log(JSON.stringify(body));
    console.log(url);
    return this.http .post(url,body, { headers: headers })
  }
  putNoToken(ctrl,id,body){
    const url = this.base+ctrl+"/"+id;
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache') 
    .set('content-type', 'application/json') 
    console.log("post");
    console.log(JSON.stringify(body));
    console.log(url);
    return this.http.put(url,body, { headers: headers })
  }
  
  errorFirst(json):string{  
    let error =  json.error; 
    let keys =Object.keys(error);
    for (let i = 0 ; i < keys.length;i++){
      let key = keys[i];
      let keyarray = error[key];
      console.log(keyarray);
      for(let x = 0 ; x < keyarray.length ; x++){
        // console.log(keyarray[x]); 
        // arr.push(keyarray[x]);
        return keyarray[x];
      }
    } 
  }
}
