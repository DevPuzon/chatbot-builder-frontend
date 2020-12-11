import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { CustomHttpService } from 'src/app/utils/custom-http.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private router:Router,
    private cushttp:CustomHttpService,
    private popover:PopoverController) { }

  ngOnInit() {}

  logout(){   
    this.popover.dismiss();
    this.cushttp.onLogoutUser();
  }
}
