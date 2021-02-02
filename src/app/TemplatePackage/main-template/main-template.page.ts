import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular'; 
import { CustomHttp } from 'src/app/utils/custom-http.service';
import { IonPopOverListComponent } from 'src/app/utils/ion-pop-over-list/ion-pop-over-list.component';
@Component({
  selector: 'app-main-template',
  templateUrl: './main-template.page.html',
  styleUrls: ['./main-template.page.scss'],
})
export class MainTemplatePage implements OnInit {

  constructor(
    private cusHttp:CustomHttp,
    private router:Router,
    private popCtrl:PopoverController
  ) { }

  ngOnInit() {
  }

  async onMenu(ev){ 
    const popover = await this.popCtrl.create({
      component: IonPopOverListComponent ,  
      event: ev ,
      componentProps:{
        buttons:['Projects','Logout']
      }
    });
    await popover.present(); 
    popover.onDidDismiss().then(async (snap)=>{
      console.log(snap);
      const data = snap.data; 
      if(!data){return;}
      console.log(data);
      switch(data.name){ 
        case "Projects":
            this.router.navigateByUrl("p");
          break; 
        case "Logout": 
          this.cusHttp.onLogoutUser();
          break;
      }
    });
  }
}
