import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CustomHttp } from 'src/app/utils/custom-http.service';

@Component({
  selector: 'app-connect-fb-page',
  templateUrl: './connect-fb-page.component.html',
  styleUrls: ['./connect-fb-page.component.scss'],
})
export class ConnectFbPageComponent implements OnInit {
  @Input() data:any[]; 
  constructor(
    private custHttps:CustomHttp,
    private mdlCtrl:ModalController
  ) { }

  ngOnInit() {
    console.log(this.data);
    for(let i = 0 ; i < this.data.length;i++){ 
      const el = this.data[i];
      this.custHttps.getNoBase(`https://graph.facebook.com/v9.0/${el.id}/picture?access_token=${el.access_token}&redirect=0&height=200&width=200`)
      .subscribe((snap:any)=>{
        console.log(snap);
        Object.assign(this.data[i],{url:snap.data.url})
      })
    }
    console.log(this.data);
  }

  onBack(){
    this.mdlCtrl.dismiss();
  }
  
}
