import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainTemplatePageRoutingModule } from './main-template-routing.module';

import { MainTemplatePage } from './main-template.page';

import { PreviewTemplateComponent } from '../preview-template/preview-template.component';
import { ListTemplateComponent } from '../ListTemplate/list-template/list-template.component';
import { ListContentTemplateComponent } from '../ListTemplate/list-content/list-content-template.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainTemplatePageRoutingModule
  ],
  declarations: [MainTemplatePage,ListTemplateComponent,PreviewTemplateComponent,ListContentTemplateComponent]
})
export class MainTemplatePageModule {}
