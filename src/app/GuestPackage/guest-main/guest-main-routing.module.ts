import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChooseTemplateComponent } from '../choose-template/choose-template.component';

import { GuestMainPage } from './guest-main.page';

const routes: Routes = [
  {
    path: '',
    component: GuestMainPage,
    children:[
      {
        path:"choose-template",
        component:ChooseTemplateComponent
      },
      {
        path:"t",
        loadChildren: () => import('../../AutomationMain/main-automation/main-automation.module').then( m => m.MainAutomationPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestMainPageRoutingModule {}
