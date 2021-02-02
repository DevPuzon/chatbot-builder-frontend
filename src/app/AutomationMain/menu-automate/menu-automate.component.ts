import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { FacebookLoginProvider, SocialAuthService } from 'angularx-social-login';
import { ConnectFbPageComponent } from 'src/app/ProjectPackage/connect-fb-page/connect-fb-page.component';
import { CustomHttp } from 'src/app/utils/custom-http.service';
import { ToastMessageService } from 'src/app/utils/toast-message.service';
import { ConnectRealAccComponent } from '../connect-real-acc/connect-real-acc.component';
import { ExportastemplateComponent } from '../exportastemplate/exportastemplate.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu-automate.component.html',
  styleUrls: ['./menu-automate.component.scss'],
})
export class MenuAutomateComponent implements OnInit {

  @Input() project_id:any;
  @Input() template_id:any;
  constructor(private router:Router,
    private modalController:ModalController,
    private loadingController:LoadingController,
    private cusHttp:CustomHttp,
    private route:ActivatedRoute,
    private authService: SocialAuthService,
    private toast:ToastMessageService,
    private alertController:AlertController,
    private popover:PopoverController) {  
    }

  ngOnInit() {
    console.log(this.template_id);
    if(window.location.href.includes('/guest')){
      this.isGuest = true;
    }
  }

  isGuest = false;
  logout(){   
    this.popover.dismiss();
    this.cusHttp.onLogoutUser();
  }
  async onExport(){ 
    this.popover.dismiss();
    const modal = await this.modalController.create({
      component: ExportastemplateComponent, 
      componentProps:{
        project_id:this.project_id,
        template_id:this.template_id
      }
    });
    return await modal.present();
  }
  async onNavigate(path){ 
    this.popover.dismiss(); 
    this.router.navigateByUrl(path);
  }
  async onConnectFb(){ 
    this.popover.dismiss();
    console.log(this.project_id);
    const modal = await this.modalController.create({
      component: ConnectFbPageComponent ,
      componentProps:{
        project_id: this.project_id
      }
    });
    await modal.present(); 
  } 
  
  async onContinue(){
    this.popover.dismiss(); 
    
    const modal = await this.modalController.create({
      component: ConnectRealAccComponent, 
    });
    return await modal.present();
  }
  async onInvite(){ 
    const alert = await this.alertController.create({ 
      header: 'Copy this invitation link.',
      message: 'https://aigency.com/invitation/Qa47Sff151Sgz2f4',
      buttons: [
        {
          text: 'Close',
          role: 'close',
          cssClass: 'secondary',
          handler: (blah) => {  
          }
        }, {
          text: 'Copy',
          handler: async () => { 
            const selBox = document.createElement('textarea');
            selBox.style.position = 'fixed';
            selBox.style.left = '90px';
            selBox.style.top = '0';
            selBox.style.opacity = '0';
            selBox.value ="https://aigency.com/invitation/Qa47Sff151Sgz2f4";
            document.body.appendChild(selBox);
            selBox.focus();
            selBox.select();
            document.execCommand('copy'); 
            
            this.toast.presentToast('Copied.'); 
          }
        }
      ]
    }); 
    await alert.present(); 
  }
}
