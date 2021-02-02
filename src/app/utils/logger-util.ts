import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerUtil {

  constructor() { }
  static log(txt){
    console.log(txt);
  }
}
