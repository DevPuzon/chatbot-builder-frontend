import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private router:Router,
    private popover:PopoverController) { }

  ngOnInit() {}

  logout(){
    console.log('logout');
    localStorage.clear();
    this.router.navigateByUrl("auth/login");
    this.popover.dismiss();
  }
}
