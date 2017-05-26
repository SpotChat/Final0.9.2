import { Injectable } from '@angular/core';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
/*
  Generated class for the DBService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DBService {

storage:SecureStorageObject;
  constructor(public secureStorage: SecureStorage) {
    this.secureStorage.create('spotchat').then((store)=>{this.storage=store;});
   }
  store(key:any,value:any){
      return new Promise((resolve, reject)=>{
        this.storage.set(key,value).then((resp)=>{
        resolve(resp);
      },(error)=>{
        reject(error);
      });
    });
  }
  read(key:any){
      return new Promise((resolve, reject)=>{
        this.storage.get(key).then((resp)=>{
        resolve(resp);
      },(error)=>{
        reject(error);
      });
    });
  }
  get_keys(){
      return new Promise((resolve, reject)=>{
        this.storage.keys().then((resp)=>{
        resolve(resp);
      },(error)=>{
        reject(error);
      });
    });
  } 
  delete(key:any){
      return new Promise((resolve, reject)=>{
        this.storage.remove(key).then((resp)=>{
        resolve(resp);
      },(error)=>{
        reject(error);
      });
    });
  }
}
