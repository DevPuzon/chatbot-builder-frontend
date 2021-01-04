import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-ion-pop-over-list',
  templateUrl: './ion-pop-over-list.component.html',
  styleUrls: ['./ion-pop-over-list.component.scss'],
})
export class IonPopOverListComponent implements OnInit {
  @Input() buttons:any;

  constructor(
    private popoverCtrl:PopoverController
  ) { }

  ngOnInit() {}

  onItemclick(i,a){
    this.popoverCtrl.dismiss({
      index :i,
      name:a
    });
  }
}
