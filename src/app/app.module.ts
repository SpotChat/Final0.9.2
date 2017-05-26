import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AboutPage } from "../pages/comp/about";
import { ContactPage } from "../pages/comp/contact";
import { HomePage } from "../pages/comp/home";
import { TabsPage } from "../pages/comp/tabs";
import { DatabaseSync } from "../providers/database-sync";
import { DBService } from "../providers/db-service";
import { WebService } from "../providers/web-service";
import {geoLocation} from "../providers/geolocation";
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from "@ionic-native/background-geolocation";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,BackgroundGeolocation,
    SplashScreen,
    DatabaseSync,
    DBService,
    geoLocation,
    WebService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
