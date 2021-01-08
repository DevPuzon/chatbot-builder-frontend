// import { Injectable } from '@angular/core';

// export class LoaderComponentService {

//   constructor() { }
// }

import {
  ComponentFactoryResolver,
  Injectable,
  Inject,
  ReflectiveInjector,
  ViewContainerRef
} from '@angular/core'
import { AppComponent } from '../app.component';
import { SplashScreenComponent } from '../InteractivePackage/splash-screen/splash-screen.component';
 

@Injectable({
  providedIn: 'root'
})
// @Injectable()
export class LoaderComponentService {
  // rootViewContainer: ViewContainerRef;
  
  @Inject(ViewContainerRef) rootViewContainer
  constructor(private factoryResolver: ComponentFactoryResolver ) {
    this.factoryResolver = factoryResolver
  }

  // setRootViewContainerRef(viewContainerRef) {
  //   console.log(viewContainerRef);
  //   this.rootViewContainer = viewContainerRef
  // }

  addDynamicComponent() {
    this.rootViewContainer = AppComponent.statviewContainerRef;
    console.log(this.rootViewContainer);
    const factory = this.factoryResolver
                        .resolveComponentFactory(SplashScreenComponent)
    const component = factory
      .create(this.rootViewContainer.parentInjector)
    this.rootViewContainer.insert(component.hostView)
  }

}