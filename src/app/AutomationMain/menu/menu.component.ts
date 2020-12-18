import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { CustomHttpService } from 'src/app/utils/custom-http.service';
import { ExportasfileComponent } from '../exportasfile/exportasfile.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private router:Router,
    private modalController:ModalController,
    private cushttp:CustomHttpService,
    private popover:PopoverController) { }

  ngOnInit() {}

  logout(){   
    this.popover.dismiss();
    this.cushttp.onLogoutUser();
  }
  async onExport(){ 
    this.popover.dismiss();
    const modal = await this.modalController.create({
      component: ExportasfileComponent, 
    });
    return await modal.present();
  }
}
