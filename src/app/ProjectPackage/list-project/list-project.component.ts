import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, PopoverController } from '@ionic/angular'; 
import { IonPopOverListComponent } from 'src/app/utils/ion-pop-over-list/ion-pop-over-list.component';
import { ConnectFbPageComponent } from '../connect-fb-page/connect-fb-page.component' ;

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.scss'],
})
export class ListProjectComponent implements OnInit { 

  constructor(
    private router:Router,
    private loadingController:LoadingController,
    private popCtrl:PopoverController, 
    private modalController:ModalController,
    private alertController:AlertController
  ) { }

  ngOnInit() {}

  async onConnect(){  
    const modal = await this.modalController.create({
      component: ConnectFbPageComponent, 
    });
    return await modal.present();
  }
  async onItemClick(ev){
    const popover = await this.popCtrl.create({
      component: IonPopOverListComponent ,  
      event: ev ,
      componentProps:{
        buttons:['Duplicate','Rename','Delete']
      }
    });
    await popover.present(); 
    popover.onDidDismiss().then(async (snap)=>{
      console.log(snap);
      const data = snap.data; 
      if(!data){return;}
      console.log(data);
      switch(data.name){
        case "Duplicate":
          break;
          
        case "Rename":
          const alert1 = await this.alertController.create({
            cssClass: 'alert-input',  
            header: 'Project name',
            inputs: [ 
              { 
                type: 'text',
                name:"newname",
                id: 'txt1', 
                placeholder: 'New name'
              } 
            ],
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (data) => {
                  console.log(data);
                }
              }, {
                text: 'rename',
                handler: (data) => {
                  const newName = data.newname;
                  console.log(newName);
                }
              }
            ]
          });
          await alert1.present(); 
          break;
          
        case "Delete":
          const alert = await this.alertController.create({ 
            header: 'Delete',
            message: 'Do you want to <strong>delete</strong> this project?',
            buttons: [
              {
                text: 'Cancel', 
              }, {
                text: 'Yes',
                handler: async () => {   
                }
              }
            ]
          }); 
          await alert.present(); 
          break;
      }
    });
  }

  async onBlankProj(){
    var loading = await  this.loadingController.create({ message: "Please wait ...."  });
    await loading.present(); 
    setTimeout(async () => {
      await loading.dismiss();  
      this.router.navigateByUrl("t"); 
    },2800);  
  }
}
