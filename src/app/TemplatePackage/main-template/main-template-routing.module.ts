import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTemplateComponent } from '../ListTemplate/list-template/list-template.component';


import { MainTemplatePage } from './main-template.page';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    redirectTo:"templates"
  },
  {
    path: '',
    component: MainTemplatePage,
    children:[
      {
        path:"templates",
        component:ListTemplateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainTemplatePageRoutingModule {}
