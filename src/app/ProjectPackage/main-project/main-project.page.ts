import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { CustomHttpService } from 'src/app/utils/custom-http.service';
import { IonPopOverListComponent } from 'src/app/utils/ion-pop-over-list/ion-pop-over-list.component';
 

@Component({
  selector: 'app-main-project',
  templateUrl: './main-project.page.html',
  styleUrls: ['./main-project.page.scss'],
})
export class MainProjectPage implements OnInit {

  constructor(
    private cushttp:CustomHttpService,
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
        buttons:['Templates','Logout']
      }
    });
    await popover.present(); 
    popover.onDidDismiss().then(async (snap)=>{
      console.log(snap);
      const data = snap.data; 
      if(!data){return;}
      console.log(data);
      switch(data.name){ 
        case "Templates":
            this.router.navigateByUrl("c");
          break; 
        case "Logout": 
          this.cushttp.onLogoutUser();
          break;
      }
    });
  }
}
