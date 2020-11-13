import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'; 
import { AppComponent } from './app.component';
import { UserLoginComponent } from './Auth/user-login/user-login.component';
import { UserRegisterComponent } from './Auth/user-register/user-register.component';
 
const routes: Routes = [ 
  {
    path: '',
    redirectTo: 't',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }
  ,{
    path:"auth",
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
