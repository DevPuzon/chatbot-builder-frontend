import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptService {

  constructor() { }
 
  static encryptData(data) { 
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), environment.crypt_code).toString();
    } catch (e) {
      //console.log(e);
    } 
  }

  static decryptData(data):any { 
    try {
      const bytes = CryptoJS.AES.decrypt(data,environment.crypt_code); 
      if (bytes.toString()) { 
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }else{
        return null;
      }
    } catch (e) {
      console.log(e);
    } 
  }
}
