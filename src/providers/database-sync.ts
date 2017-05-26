import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Couchbase, Database } from "cordova-couchbase/core";
import { Platform } from "ionic-angular";


/*
  Generated class for the DatabaseSync provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
declare var emit: any;


@Injectable()
export class DatabaseSync {
    private user:number=5;
    private isInstantiated: boolean;
    private database: Database;
    private listener: EventEmitter<any> = new EventEmitter();
    private syncUrl:string="http://nql.etutorials.co.in:4984/db/";

    public constructor(public http: Http, platform: Platform) {
        if(!this.isInstantiated) {
            platform.ready().then(() => {
                (new Couchbase()).openDatabase("spotchat").then(database => {
                    this.database = database;
                    if(typeof(this.user)!="undefined"){
                        let loc={
                            items:{
                                map: function (doc,meta){
                                    if(doc.type="location"){
                                        if(meta.user){
                                            if(meta.user==this.user){
                                                //Update Location Information
                                                if(doc.user==this.user){
                                                    emit(doc.user,doc._id,{lat:doc.lat,lon:doc.lon,ts:doc.ts});
                                                }else{
                                                    //User does not matches 
                                                    throw("Error: User is not authenticated.");
                                                }
                                            }
                                        }else{
                                            //New user
                                             emit(doc.user,doc._id,{lat:doc.lat,lon:doc.lon,ts:doc.ts});
                                        }
                                    }
                                }.toString()
                            }
                        };
                        this.database.createDesignDocument("_design/gps", location);
                        let chats={
                            items:{
                                map: function (doc,meta){
                                    if(doc.type="chat"){
                                        if(meta.to){
                                            if(meta.to==this.user){
                                                // Message is for this user
                                                emit(doc);
                                            }
                                        }
                                        if(doc.from==this.user){
                                            //Message is sent by this user
                                            emit(doc);
                                        }
                                    }
                                }.toString()
                            }

                        };
                        this.database.createDesignDocument("_design/chat", chats);
                    }
                    
                    let views = {
                        items: {
                            map: function(doc) {
                                if(doc.type == "list" && doc.title) {
                                    emit(doc._id, {title: doc.title, rev: doc._rev})
                                }
                            }.toString()
                        }
                    };
                    console.log(views);
                    this.database.createDesignDocument("_design/todo", views);
                    this.database.listen(change => {
                        this.listener.emit(change.detail);
                    });
                    this.database.sync(this.syncUrl, true);
                    this.isInstantiated = true;
                }, error => {
                    console.error(error);
                });
            });
        }
    }

    public getDatabase() {
        return this.database;
    }

    public getChangeListener(): EventEmitter<any> {
        return this.listener;
    }
    public get_sync_url(){
      return this.syncUrl;
    }
    public set_sync_url(url){
      this.syncUrl=url;
    }

}