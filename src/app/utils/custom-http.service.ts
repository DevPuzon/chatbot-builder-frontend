import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CryptService } from './crypt.service';
import { rejects } from 'assert';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment'; 
import { BlockUtils } from './block-utils';
import { WmatchingutilsService } from './wmatchingutils.service';

@Injectable({
  providedIn: 'root'
})
export class CustomHttp {
  // private base = "https://api.retailgate.tech:20185/api/";
  private base = "http://localhost:8080/";
  private token  = "";
  constructor(private http:HttpClient, 
    private router:Router){  
      this.base = environment.backend;
      console.log(this.base);
      this.token ="Bearer "+ localStorage.getItem("-=[]t");
  }

  get(ctrl){  
    this.base = environment.backend;
    console.log(this.base);
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
  
  getP(url){     
    console.log(url);
    const headers = new HttpHeaders() 
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
    this.base = environment.backend;
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
    this.base = environment.backend;
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
  postP(url,body){   
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache') 
    .set('content-type', 'application/json')  
    return this.http
    .post(url,body, { headers: headers })
  }
  put(ctrl,body){
    this.base = environment.backend;
    this.token ="Bearer "+ localStorage.getItem("-=[]t");
    console.log(this.token);
    const url = this.base+ctrl;
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache')
    .set('Authorization', this.token)
    .set('content-type', 'application/json')  
    return this.http
    .put(url,body, { headers: headers })
  }
  
  del(ctrl,id){
    this.base = environment.backend;
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
    this.base = environment.backend;
    const url = this.base+ctrl;
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache') 
    .set('content-type', 'application/json') 
    console.log(url); 
    return this.http
    .get(url, { headers: headers })
  }
  
  delNoToken(ctrl,id){
    this.base = environment.backend;
    const url = this.base+ctrl+"/"+id;
    const headers = new HttpHeaders()
    .set('cache-control', 'no-cache') 
    .set('content-type', 'application/json') 
    console.log(url); 
    return this.http
    .delete(url, { headers: headers })
  }
  
  postNoToken(ctrl,body){
    this.base = environment.backend;
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
    this.base = environment.backend;
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
    this.base = environment.backend;
    let error =  json.error; 
    let keys =Object.keys(error);
    for (let i = 0 ; i < keys.length;i++){
      let key = keys[i];
      let keyarray = error[key];
      return keyarray.message; 
    } 
  }

  
   getUser(){
    this.base = environment.backend;
    this.token ="Bearer "+ localStorage.getItem("-=[]t");
    console.log(this.token);
    return new Promise<any>((resolve,reject)=>{ 
      this.get("account")
      .subscribe((snap:any)=>{
        console.log(snap);
        if(!snap){
          reject();
          this.onLogoutUser();
          return;
        }
        localStorage.setItem('-==0us',JSON.stringify(snap));
        localStorage.setItem("-=[]t",snap.token);
        resolve(snap);
      }, 
      (err: Response) => { 
        console.log(err) ;
        reject(err);
        this.onLogoutUser();
      });
      
      // resolve({
      //   clientID:1,
      // });
    })
  }
  async onLogoutUser(){// this.toast.presentToast("Something went wrong");
    // await  BlockUtils.delBlocks();
    // await WmatchingutilsService.delWordMatch();
    localStorage.clear();
    this.router.navigateByUrl("auth/login");
      setTimeout(() => { 
        window.location.reload();
      }, 800);
  }
  
  httpErrRes(err: any): any {
    if(err.status == 401){
      localStorage.removeItem('-=[]t');
      this.router.navigateByUrl('/'); 
    }
    return err.error.error_message;
  } 
}
