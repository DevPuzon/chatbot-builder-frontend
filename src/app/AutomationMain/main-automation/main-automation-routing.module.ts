import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutomationComponent } from '../automation/automation.component';
import { AutomationGuardGuard } from './automation-guard.guard';

import { MainAutomationPage } from './main-automation.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'automate',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainAutomationPage, 
    children:[
      {
        path:"automate",
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
