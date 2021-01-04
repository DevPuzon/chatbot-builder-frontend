import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { PreviewTemplateComponent } from '../preview-template/preview-template.component';

@Component({
  selector: 'app-list-template',
  templateUrl: './list-template.component.html',
  styleUrls: ['./list-template.component.scss'],
})
export class ListTemplateComponent implements OnInit {

  constructor(
    private loadingController:LoadingController,
    private router:Router,
    private modalController:ModalController
  ) { }

  ngOnInit() {}

  async onPreview(){ 
    const modal = await this.modalController.create({
      component: PreviewTemplateComponent, 
      cssClass:'modal-rad'
    });
    return await modal.present();
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
