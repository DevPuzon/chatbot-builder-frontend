import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListProjectComponent } from '../list-project/list-project.component';

import { MainProjectPage } from './main-project.page';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'projects'
  },
  {
    path: '',
    component: MainProjectPage,
    children:[
      {
        path:'projects',
        component:ListProjectComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainProjectPageRoutingModule {}
