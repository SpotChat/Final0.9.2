import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
/*
  Generated class for the WebService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WebService {
  url:string="http://spotchat.etutorials.co.in/";
  //response:any;
  constructor(public http: HTTP) {
    
  }
  send(data,headers){
    return new Promise((resolve, reject)=>{
      this.http.post(this.url,data,headers).then((resp)=>{
        resolve(resp);
      },(error)=>{
        //reject(error);
        console.log(error+data);
      });
    });
  }
}