import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutomationComponent } from '../automation/automation.component';

import { MainAutomationPage } from './main-automation.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'automation',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainAutomationPage,
    children:[
      {
        path:"automation",
        component:AutomationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainAutomationPageRoutingModule {}
