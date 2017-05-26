import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { WebService } from "../../providers/web-service";
import { TabsPage } from "./tabs";
import { HomePage } from "./home";
import { DBService } from "../../providers/db-service";

@Component({
  selector: 'register',
  templateUrl: '../view/register.html'
})
export class Register {
  
  form = { goToEmail:false, goToPhoneBtn: false, phone: false, otp: false, social: false, email: false, emailerror: false, profile: false, evc: false, data: {} };
  stat:boolean;
  data:any;
  info:any;
  root:any;
  constructor(public app: App,public ws:WebService,public navCtrl: NavController,public db:DBService) {
    this.form.phone=true;
    console.log(Object.keys(this.form.data));
    this.root=app.getRootNav();
 }
 login_successful(){
   //this.root.setRoot(TabsPage);
   this.root.setRoot(HomePage);
 }
 manage_form(){
   //Reseting values
   this.form.email=false;
   this.form.evc=false;
   this.form.goToEmail=false;
   this.form.goToPhoneBtn=false;
   this.form.otp=false;
   this.form.phone=false;
   this.form.profile=false;
   this.form.social=false;

   switch(this.info.form){
     case 'reg':
      this.form.phone=true;
     break;
     case 'verify_otp':
      this.form.otp=true;
      if(this.info.otp_verify=='failed'){
        this.form.goToPhoneBtn=true;
      }
     break;
     case 'social':
      this.form.social=true;
     break;
     case 'evc_form':
      this.form.evc=true;
      if(this.info.evc_verify=='failed'){
        this.form.goToEmail=true;
      }
     break;
     case 'email_form':
      this.form.email=true;
     break;
     case 'profile':
     this.form.profile=true;
     break;
     case 'login_successful':
     this.db.store('id',this.info.id);
     console.log("The ID "+this.info.id+"Has been stored");
     this.login_successful();

   }
 }
 get_otp(){   
   this.ws.send(this.form.data,{action:"get_otp"}).then((resp)=>{
     this.data=resp;
     this.info=JSON.parse(this.data.data);
     this.manage_form();
     console.log(this.info);
   });
  }

 otp_verify(){   
   this.ws.send(this.form.data,{action:"otp_verify"}).then((resp)=>{
     this.data=resp;
     this.info=JSON.parse(this.data.data);
     this.manage_form();
     console.log(this.info);
   });
  }

  goToPhone(){
    this.form.phone=true;
    this.form.otp=false;
    this.form.goToPhoneBtn=false;
  }
  eml_connect(){
    this.form.email=true;
    this.form.social=false;
  }
  get_evc(){
    this.ws.send(this.form.data,{action:"get_evc"}).then((resp)=>{
     this.data=resp;
     this.info=JSON.parse(this.data.data);
     this.manage_form();
     console.log(this.info);
   });
  }
  evc_verify(){
    this.ws.send(this.form.data,{action:"evc_verify"}).then((resp)=>{
     this.data=resp;
     this.info=JSON.parse(this.data.data);
     this.manage_form();
     console.log(this.info);
   });
  }
  goToEmail(){
    this.form.email=true;
    this.form.evc=false;
  }
  profile_update(){
    this.ws.send(this.form.data,{action:"create_user"}).then((resp)=>{
     this.data=resp;
     this.info=JSON.parse(this.data.data);
     this.manage_form();
     console.log(this.info);
   });
  }
}