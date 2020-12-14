import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'; 
import { AppComponent } from './app.component';
import { AuthGuardService } from './Auth/auth-guard.service';
import { UserLoginComponent } from './Auth/user-login/user-login.component';
import { UserRegisterComponent } from './Auth/user-register/user-register.component';
import { AutomationGuardGuard } from './AutomationMain/main-automation/automation-guard.guard';
 
const routes: Routes = [ 
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },  
  {
    path:"auth",
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
    canActivate:[AutomationGuardGuard],
    loadChildren: () => import('./AutomationMain/main-automation/main-automation.module').then( m => m.MainAutomationPageModule)
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
  AppComponent,UserLoginComponent,UserRegisterComponent
]
export const entryComponents= [
  UserLoginComponent,UserRegisterComponent
]
