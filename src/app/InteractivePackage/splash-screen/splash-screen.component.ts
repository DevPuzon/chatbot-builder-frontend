import { Component, ComponentFactoryResolver, Inject, Injectable, OnInit, ViewContainerRef } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
}) 
export class SplashScreenComponent implements OnInit {
 
  constructor() { }

  ngOnInit() {  
  } 
}

@Injectable({
  providedIn: 'root'
})
// @Injectable()
export class SplashScreenController { 
  
  @Inject(ViewContainerRef) rootViewContainer
  constructor(private factoryResolver: ComponentFactoryResolver ) {
    this.factoryResolver = factoryResolver
  }
 

  show() { 
    console.log("show");
    this.rootViewContainer = AppComponent.statviewContainerRef; 
    const factory = this.factoryResolver
                        .resolveComponentFactory(SplashScreenComponent)
    const component = factory
      .create(this.rootViewContainer.parentInjector)
    this.rootViewContainer.insert(component.hostView) 
  }

  showDefTime() { 
    this.show();
    setTimeout(() => {
      this.dismiss();
    }, 0);
  }
  
  showCusTime(seconds) { 
    this.show();
    setTimeout(() => {
      this.dismiss();
    }, seconds);
  }

  dismiss() { 
    console.log("dismiss");
    this.rootViewContainer.clear();
  }
}