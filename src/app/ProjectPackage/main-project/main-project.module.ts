import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainProjectPageRoutingModule } from './main-project-routing.module';

import { MainProjectPage } from './main-project.page';
import { ListProjectComponent } from '../list-project/list-project.component';
import { ConnectFbPageComponent } from '../connect-fb-page/connect-fb-page.component';
import { ListContentTemplateComponent } from 'src/app/TemplatePackage/ListTemplate/list-content/list-content-template.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainProjectPageRoutingModule
  ],
  declarations: [MainProjectPage,ListProjectComponent,ListContentTemplateComponent]
})
export class MainProjectPageModule {}
