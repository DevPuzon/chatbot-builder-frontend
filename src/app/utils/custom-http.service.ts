import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CryptService } from './crypt.service';
import { rejects } from 'assert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpService {

  // private base  ="https://fbchatbotexample012.herokuapp.com/"; 
  // private base  ="https://chatbot-builder-api.herokuapp.com/api/"; 
  private base = "https://api.retailgate.tech:20185/api/";
  private static base = "https://api.retailgate.tech:20185/api/";
  // private base  ="http://localhost:20184/api/";  
  private token  = "";
  constructor(private http:HttpClient,
    private router:Router){  
      this.token ="Bearer "+ localStorage.getItem("-=[]t");
  }
  get(ctrl){  
    this.token ="Bearer "+ localStorage.getItem("-=[]t");
    console.log(this.token);
    const url = this.base+ctrl;
    console.log(url);
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache')
    .set('Authorization', this.token) 
    .set('content-type', 'application/json')  
    return this.http
    .get(url, { headers: headers })
  }
  
  getNoBase(ctrl){ 
    this.token ="Bearer "+ localStorage.getItem("-=[]t");
    console.log(this.token);
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
    console.log(this.token);
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
    this.token ="Bearer "+ localStorage.getItem("-=[]t");
    console.log(this.token);
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
    this.token ="Bearer "+ localStorage.getItem("-=[]t");
    console.log(this.token);
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
    this.token ="Bearer "+ localStorage.getItem("-=[]t");
    console.log(this.token);
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

  
   getUser(){
    this.token ="Bearer "+ localStorage.getItem("-=[]t");
    console.log(this.token);
    return new Promise<any>((resolve,reject)=>{ 
      this.get("account")
      .subscribe((snap:any)=>{
        console.log(snap);
        if(!snap){
          reject();
          return;
        }
        resolve(snap);
        localStorage.setItem("-=[]t",snap.token);
      }, 
      (err: Response) => { 
        console.log(err) ;
        reject(err);
        this.onLogoutUser();
      });
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
