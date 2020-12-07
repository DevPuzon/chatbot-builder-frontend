import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from 'src/environments/environment';
import { UUID } from 'aws-sdk/clients/inspector';
import { UuidService } from './uuid.service';
@Injectable({
  providedIn: 'root'
})
export class UploadtostService { 
  constructor() { }
  static ACCESS_KEY_ID = environment.ACCESS_KEY_ID;
  static SECRET_ACCESS_KEY = environment.SECRET_ACCESS_KEY;
  static AWS_REGION = environment.AWS_REGION;
  static S3_BUCKET = environment.S3_BUCKET;
  static uploadFile(file) {
    return new Promise<any>((resolve)=>{  
      const contentType = file.type;
      const bucket = new S3(
          {
              accessKeyId: this.ACCESS_KEY_ID,
              secretAccessKey: this.SECRET_ACCESS_KEY,
              region: this.AWS_REGION
          }
      );
      const params = {
          Bucket: this.S3_BUCKET,
          Key: 'chatbotbuilder/'+UuidService.makeid(12)+"--"+file.name,
          Body: file,
          ACL: 'public-read',
          ContentType: contentType
      };
      bucket.upload(params, function (err, data) {
          if (err) { 
              return false;
          } 
          resolve(data);
          return true;
      });
//for upload progress   
/*bucket.upload(params).on('httpUploadProgress', function (evt) {
          console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
      }).send(function (err, data) {
          if (err) {
              console.log('There was an error uploading your file: ', err);
              return false;
          }
          console.log('Successfully uploaded file.', data);
          return true;
      });*/
    });
  }
}
