import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { WmatchingutilsService } from 'src/app/Utils/wmatchingutils.service';
import { WmPropertiesComponent } from '../wm-properties/wm-properties.component';  
 
@Component({
  selector: 'app-word-matching-content',
  templateUrl: './word-matching-content.component.html',
  styleUrls: ['./word-matching-content.component.scss'],
})
export class WordMatchingContentComponent implements OnInit {

  wmatchingdtas = new Array();
  constructor(private popoverController:PopoverController) { }

  ngOnInit() {
    this.init();
  }

  init() {
    if(WmatchingutilsService.getWordMatch() != null){
      this.wmatchingdtas = WmatchingutilsService.getWordMatch();
    }else{
      this.wmatchingdtas.push({user_possible_words:[],commands:[ {
        "command_type": "",
        "text_message": "",
        "block_properties": []
      }]});
    }
  }

  async onSCommand(ev,wmatchingdtas_i){
    const popover = await this.popoverController.create({
      component: WmPropertiesComponent , 
      cssClass: 'ion-popover',
      event: ev,
      componentProps:{wmatchingdtas_i:wmatchingdtas_i,wmatchingdtas:this.wmatchingdtas}
    });
    return await popover.present();
  }

  kWord(word,wm_i){
    this.wmatchingdtas[wm_i].user_possible_words.push(word);
    WmatchingutilsService.setWordMatch(this.wmatchingdtas);
  }
  delWord(word_i,wm_i){
    this.wmatchingdtas[wm_i].user_possible_words.splice(word_i, 1);
    WmatchingutilsService.setWordMatch(this.wmatchingdtas);
  }
}
