import { Component, OnInit, ViewChild } from '@angular/core';  
import { ModalController } from '@ionic/angular';
import { CustomHttp } from 'src/app/utils/custom-http.service';
import { ToastMessageService } from 'src/app/utils/toast-message.service';
import { PreviewTemplateComponent } from '../../preview-template/preview-template.component';
import { ListContentTemplateComponent } from '../list-content/list-content-template.component';


@Component({
  selector: 'app-list-template',
  templateUrl: './list-template.component.html',
  styleUrls: ['./list-template.component.scss'],
})
export class ListTemplateComponent implements OnInit {
  @ViewChild("list_template_content")  list_template_content :ListContentTemplateComponent;
  isLoading = false
   
  constructor(  
  ) { }

  ngOnInit() {
    
  }

  onCType(ev){ 
    this.list_template_content.loadData(ev);
  }  
  onChildActivity(ev){
    console.log(ev);
    this.isLoading = ev.isLoading;
  }
}
