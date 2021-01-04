import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'; 
import { AppComponent } from './app.component';
import { AuthGuardService } from './Auth/auth-guard.service';
import { AuthMainComponent } from './Auth/auth-main/auth-main.component';
import { UserLoginComponent } from './Auth/user-login/user-login.component';
import { UserRegisterComponent } from './Auth/user-register/user-register.component';
import { ConnectRealAccComponent } from './AutomationMain/connect-real-acc/connect-real-acc.component';
import { AutomationGuardGuard } from './AutomationMain/main-automation/automation-guard.guard';
import { IonPopOverListComponent } from './utils/ion-pop-over-list/ion-pop-over-list.component';
 
const routes: Routes = [ 
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },  
  {
    path:"auth",
    component:AuthMainComponent,
    canActivate:[AuthGuardService],
    children:[
      {
        path:"login",
        component:UserLoginComponent
      },
      {
        path:"register",
        component:UserRegisterComponent
      },
    ]
  },
  {
    path: 't', 
    loadChildren: () => import('./AutomationMain/main-automation/main-automation.module').then( m => m.MainAutomationPageModule)
  }, 
  {
    path: 'p',
    loadChildren: () => import('./ProjectPackage/main-project/main-project.module').then( m => m.MainProjectPageModule)
  },
  {
    path: 'c',
    loadChildren: () => import('./TemplatePackage/main-template/main-template.module').then( m => m.MainTemplatePageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const declarations= [
  AppComponent,UserLoginComponent,UserRegisterComponent,
  IonPopOverListComponent,AuthMainComponent,
  ConnectRealAccComponent

]
export const entryComponents= [
  UserLoginComponent,UserRegisterComponent
  ,AuthMainComponent,  ConnectRealAccComponent
]
