import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CryptService } from './crypt.service';
import { rejects } from 'assert';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoggerUtil } from './logger-util';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpService {

  // private base  ="https://fbchatbotexample012.herokuapp.com/"; 
  // private base  ="https://chatbot-builder-api.herokuapp.com/api/"; 
  private base = "https://api.retailgate.tech:20185/api/";
  // private static base = "https://api.retailgate.tech:20185/api/";
  // private base  ="http://localhost:20184/api/";  
  private token  = "";
  constructor(private http:HttpClient,
    private router:Router){  
      this.base = environment.backend;
      LoggerUtil.log(this.base);
      this.token ="Bearer "+ localStorage.getItem("-=[]t");
  }
  get(ctrl){  
    this.token ="Bearer "+ localStorage.getItem("-=[]t");
    LoggerUtil.log(this.token);
    const url = this.base+ctrl;
    LoggerUtil.log(url);
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache')
    .set('Authorization', this.token) 
    .set('content-type', 'application/json')  
    return this.http
    .get(url, { headers: headers })
  }
  
  getNoBase(ctrl){ 
    this.token ="Bearer "+ localStorage.getItem("-=[]t");
    LoggerUtil.log(this.token);
    const url = ctrl;
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache')
    .set('Authorization', this.token) 
    .set('content-type', 'application/json')  
    return this.http
    .get(url, { headers: headers })
  }
  getId(ctrl,id){
    this.token ="Bearer "+ localStorage.getItem("-=[]t");
    LoggerUtil.log(this.token);
    const url = this.base+ctrl+"/"+id;
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache')
    .set('Authorization', this.token)
    .set('content-type', 'application/json') ;
    LoggerUtil.log(url);
    return this.http
    .get(url, { headers: headers })
  } 

  post(ctrl,body){
    this.token ="Bearer "+ localStorage.getItem("-=[]t");
    LoggerUtil.log(this.token);
    const url = this.base+ctrl;
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache')
    .set('Authorization', this.token)
    .set('content-type', 'application/json') 
    LoggerUtil.log("post");
    LoggerUtil.log(body);
    LoggerUtil.log(url);
    return this.http
    .post(url,body, { headers: headers })
  }
  put(ctrl,id,body){
    this.token ="Bearer "+ localStorage.getItem("-=[]t");
    LoggerUtil.log(this.token);
    const url = this.base+ctrl+"/"+id;
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache')
    .set('Authorization', this.token)
    .set('content-type', 'application/json') 
    LoggerUtil.log(body);
    LoggerUtil.log(url);
    return this.http
    .put(url,body, { headers: headers })
  }
  
  del(ctrl,id){
    this.token ="Bearer "+ localStorage.getItem("-=[]t");
    LoggerUtil.log(this.token);
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
    LoggerUtil.log(url); 
    return this.http
    .get(url, { headers: headers })
  }
  
  delNoToken(ctrl,id){
    const url = this.base+ctrl+"/"+id;
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache') 
    .set('content-type', 'application/json') 
    LoggerUtil.log(url); 
    return this.http
    .delete(url, { headers: headers })
  }
  
  postNoToken(ctrl,body){
    const url = this.base+ctrl;
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache') 
    .set('content-type', 'application/json') 
    LoggerUtil.log("post");
    LoggerUtil.log(JSON.stringify(body));
    LoggerUtil.log(url);
    return this.http .post(url,body, { headers: headers })
  }
  putNoToken(ctrl,id,body){
    const url = this.base+ctrl+"/"+id;
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache') 
    .set('content-type', 'application/json') 
    LoggerUtil.log("post");
    LoggerUtil.log(JSON.stringify(body));
    LoggerUtil.log(url);
    return this.http.put(url,body, { headers: headers })
  }
  
  errorFirst(json):string{  
    let error =  json.error; 
    let keys =Object.keys(error);
    for (let i = 0 ; i < keys.length;i++){
      let key = keys[i];
      let keyarray = error[key];
      LoggerUtil.log(keyarray);
      for(let x = 0 ; x < keyarray.length ; x++){
        // LoggerUtil.log(keyarray[x]); 
        // arr.push(keyarray[x]);
        return keyarray[x];
      }
    } 
  }

  
   getUser(){
    this.token ="Bearer "+ localStorage.getItem("-=[]t");
    LoggerUtil.log(this.token);
    return new Promise<any>((resolve,reject)=>{ 
      this.get("account")
      .subscribe((snap:any)=>{
        LoggerUtil.log(snap);
        if(!snap){
          reject();
          return;
        }
        localStorage.setItem('-==0us',JSON.stringify(snap));
        localStorage.setItem("-=[]t",snap.token);
        resolve(snap);
      }, 
      (err: Response) => { 
        LoggerUtil.log(err) ;
        reject(err);
        this.onLogoutUser();
      });
      
      // resolve({
      //   clientID:1,
      // });
    })
  }
  onLogoutUser(){// this.toast.presentToast("Something went wrong");
  this.router.navigateByUrl("");
  localStorage.clear();
    setTimeout(() => { 
      window.location.reload();
    }, 1500);
  }
}
