import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AutomationComponent } from './automation/automation.component';
import { AddTextButtonPopupComponent } from './add-text-button-popup/add-text-button-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
//SOCIAL LOGIN
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login'; //https://github.com/abacritt/angularx-social-login
import { WordMatchingContentComponent } from './WordMatching/word-matching-content/word-matching-content.component';
import { WmPropertiesComponent } from './WordMatching/wm-properties/wm-properties.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [AppComponent,AutomationComponent,AddTextButtonPopupComponent,
    WordMatchingContentComponent,WmPropertiesComponent],
  entryComponents: [AutomationComponent,AddTextButtonPopupComponent ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AngularFireDatabaseModule,
    DragDropModule,
    FormsModule, HttpClientModule, 
    ReactiveFormsModule,
    SocialLoginModule,
    BrowserModule, 
    IonicModule.forRoot(),
     AppRoutingModule],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [ 
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('3443378839110052')
          }
        ]
      } as SocialAuthServiceConfig,
    },
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
