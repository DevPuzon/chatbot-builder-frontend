import { Component, ViewContainerRef } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreenController } from './InteractivePackage/splash-screen/splash-screen.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public static statviewContainerRef:any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private viewContainerRef:ViewContainerRef,
    private splCtrl:SplashScreenController

  ) {  
    AppComponent.statviewContainerRef = viewContainerRef;
    splCtrl.showDefTime(); 
    this.initializeApp();
    this.toggleDarkTheme();
  }

  toggleDarkTheme() {  
    document.body.classList.toggle('light', true); 
  } 
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
