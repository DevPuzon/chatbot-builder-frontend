import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';

@Injectable({
  providedIn: 'root'
})
export class FbProcessService {

  static cusHttp :CustomHttpService;
  constructor() { }
  
  static async prepPages(data) {
    return new Promise<any>((resolve,reject)=>{ 
      // this.cusHttp.getP(`https://graph.facebook.com/${user_id}/accounts?fields=name,access_token&access_token=${access_token}`)
      // .subscribe((snap:any)=>{
      //   const data = snap.data;
      //   console.log(data);
      //   data.forEach(async el => { 
      //     const data = await new Promise<any>((resolve)=>{
      //       this.cusHttp.postP(`https://graph.facebook.com/${el.id}/subscribed_apps?subscribed_fields=messages,message_deliveries,messaging_pre_checkouts,messaging_referrals,standby,message_reactions,messaging_postbacks,message_reads,messaging_checkout_updates,message_echoes,messaging_handovers,inbox_labels,messaging_optins,messaging_payments,messaging_account_linking,messaging_game_plays,messaging_policy_enforcement&access_token=${el.access_token}`,{})
      //       .subscribe((data)=>{
      //         resolve(data);
      //       })
      //     })
      //     console.log(data);
      //   }); 
      //   console.log("Logging in ...."); 
      //   resolve({});
      // },err=>{
      //   reject(err);
      // });
        
      data.forEach(async el => { 
        const data = await new Promise<any>((resolve)=>{
          this.cusHttp.postP(`https://graph.facebook.com/${el.id}/subscribed_apps?subscribed_fields=messages,message_deliveries,messaging_pre_checkouts,messaging_referrals,standby,message_reactions,messaging_postbacks,message_reads,messaging_checkout_updates,message_echoes,messaging_handovers,inbox_labels,messaging_optins,messaging_payments,messaging_account_linking,messaging_game_plays,messaging_policy_enforcement&access_token=${el.access_token}`,{})
          .subscribe((data)=>{
            resolve(data);
          })
        })
        console.log(data);
      }); 
      console.log("Logging in ...."); 
      resolve({});
    })
  }
  
  static async getLongLiveUserAToken(fb_exchange_token){
    return new Promise<any>((resolve,reject)=>{
      const client_id = '917782305413341';
      const client_secret = '8d899f40bbdc627957c006855712cf38'; 
      this.cusHttp.getP(`https://graph.facebook.com/v9.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${client_id}&client_secret=${client_secret}&fb_exchange_token=${fb_exchange_token}`)
      .subscribe((snap:any)=>{
        resolve({
          access_token:snap.access_token
        })
      },err=>{
        reject(err);
      });
    });
  }
  
  static async getLongLivePageToken(user_id,access_token){
    return new Promise<any>((resolve,reject)=>{ 
      this.cusHttp.getP(`https://graph.facebook.com/v9.0/${user_id}/accounts?access_token=${access_token}&fields=name,access_token`)
      .subscribe((snap:any)=>{
        resolve({
          data:snap.data
        })
      },err=>{
        reject(err); 
      });
    });
  }
}
