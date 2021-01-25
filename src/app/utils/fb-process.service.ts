import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomHttp } from './custom-http.service';

@Injectable({
  providedIn: 'root'
})
export class FbProcessService {
  static stat_cusHttp :CustomHttp; 
  static async prepPages(data) { 
    return new Promise<any>(async (resolve,reject)=>{ 
      // FbProcessService.cusHttp.getP(`https://graph.facebook.com/${user_id}/accounts?fields=name,access_token&access_token=${access_token}`)
      // .subscribe((snap:any)=>{
      //   const data = snap.data;
      //   console.log(data);
      //   data.forEach(async el => { 
      //     const data = await new Promise<any>((resolve)=>{
      //       FbProcessService.cusHttp.postP(`https://graph.facebook.com/${el.id}/subscribed_apps?subscribed_fields=messages,message_deliveries,messaging_pre_checkouts,messaging_referrals,standby,message_reactions,messaging_postbacks,message_reads,messaging_checkout_updates,message_echoes,messaging_handovers,inbox_labels,messaging_optins,messaging_payments,messaging_account_linking,messaging_game_plays,messaging_policy_enforcement&access_token=${el.access_token}`,{})
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
      let prep_data = [];   
      let i = 0 ;
      await Promise.all(data.map(async (el) => {
        console.log(i);
        
       
        
        await new Promise<any>((resolve)=>{
          FbProcessService.stat_cusHttp.postP(`https://graph.facebook.com/${el.id}/subscribed_apps?subscribed_fields=messages,message_deliveries,messaging_pre_checkouts,messaging_referrals,standby,message_reactions,messaging_postbacks,message_reads,messaging_checkout_updates,message_echoes,messaging_handovers,inbox_labels,messaging_optins,messaging_payments,messaging_account_linking,messaging_game_plays,messaging_policy_enforcement&access_token=${el.access_token}`,{})
          .subscribe((snap:any)=>{ 
            console.log(snap);
            // let i =prep_data.length;  
            
            FbProcessService.stat_cusHttp.getP(`https://graph.facebook.com/v9.0/${el.id}/picture?access_token=${el.access_token}&redirect=0&height=200&width=200`)
            .subscribe((snap:any)=>{ 
              const photo_url = snap.data.url; 
              prep_data.push({
                fb_page_id:el.id,
                name: el.name,
                is_problem_connection : false,
                fb_page_access_token : el.access_token, 
                page_img:photo_url
              });
              resolve({}); 
            }) 
          },err=>{
            console.log(el.name);
            console.log(el.id);
            console.log(err); 
            FbProcessService.stat_cusHttp.getP(`https://graph.facebook.com/v9.0/${el.id}/picture?access_token=${el.access_token}&redirect=0&height=200&width=200`)
            .subscribe((snap:any)=>{ 
              const photo_url = snap.data.url; 
              prep_data.push({
                fb_page_id:el.id,
                name: el.name,
                is_problem_connection : true,
                fb_page_access_token : el.access_token, 
                page_img:photo_url
              });
              resolve({}); 
            }) 
          })
        }) 
         

      }));
      // await data.forEach(async el => { 
      // }); 
      console.log(prep_data);
      console.log("Logging in ...."); 
      resolve(prep_data);
    })
  }
  
  static async getLongLiveUserAToken(fb_exchange_token){ 
    return new Promise<any>((resolve,reject)=>{
      const client_id =  environment.fb_app_client_id;
      const client_secret = environment.fb_app_client_secret; 
      FbProcessService.stat_cusHttp.getP(`https://graph.facebook.com/v9.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${client_id}&client_secret=${client_secret}&fb_exchange_token=${fb_exchange_token}`)
      .subscribe((snap:any)=>{
        console.log('getLongLiveUserAToken');
        console.log(snap);
        resolve(snap.access_token)
      },err=>{
        console.log('getLongLiveUserAToken');
        reject(err);
      });
    });
  }
  
  static async getLongLivePageToken(user_id,access_token){
    return new Promise<any>((resolve,reject)=>{ 
      FbProcessService.stat_cusHttp.getP(`https://graph.facebook.com/v9.0/${user_id}/accounts?access_token=${access_token}&fields=name,access_token`)
      .subscribe((snap:any)=>{
        console.log('getLongLivePageToken');
        console.log(snap);
        resolve(snap.data)
      },err=>{
        console.log('getLongLivePageToken');
        reject(err); 
      });
    });
  }

  static async setFbPageAccessToken(data){
    return new Promise<any>((resolve,reject)=>{ 
      console.log(data);
      FbProcessService.stat_cusHttp.post(`fbpage/set-fb-token`,data)
      .subscribe((snap:any)=>{ ;
        console.log(snap);
        resolve(snap)
      },err=>{ 
        reject(err); 
      });
    });
  }
}
