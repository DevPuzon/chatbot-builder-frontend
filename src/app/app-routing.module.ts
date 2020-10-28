import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AddTextButtonPopupComponent } from './add-text-button-popup/add-text-button-popup.component';
import { UserLoginComponent } from './Auth/user-login/user-login.component';
import { AutomationComponent } from './automation/automation.component';

const routes: Routes = [ 
  {
    path: '',
    redirectTo: 'automation',
    pathMatch: 'full'
  },{
    path:"automation",
    component:AutomationComponent
  },{
    path:"popupaddtxt",
    component:AddTextButtonPopupComponent
  },{
    path:"login",
    component:UserLoginComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
