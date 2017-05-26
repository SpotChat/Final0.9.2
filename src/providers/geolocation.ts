import { Injectable, EventEmitter } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';

/*
  Generated class for the DatabaseSync provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


@Injectable()
export class geoLocation{
    constructor(private backgroundGeolocation: BackgroundGeolocation) { }
    init(){
        const config: BackgroundGeolocationConfig = {
            desiredAccuracy: 50,
            stationaryRadius: 20,
            distanceFilter: 30,
            debug: true, //  enable this hear sounds for background-geolocation life-cycle.
            stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    };

        this.backgroundGeolocation.configure(config)
        .subscribe((location: BackgroundGeolocationResponse) => {

            console.log(location);

            // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
            // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
            // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
            this.backgroundGeolocation.finish(); // FOR IOS ONLY

        },(error)=>{console.log(error);});

        // start recording location
        this.backgroundGeolocation.start();

        // If you wish to turn OFF background-tracking, call the #stop method.
        //this.backgroundGeolocation.stop();
    }
    

}