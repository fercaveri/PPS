import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, Network } from 'ionic-native';
import { DatabaseProvider } from '../providers/database-provider';
import { GlobalVariables } from '../providers/global-variables-provider';
import { HomePage } from '../pages/home/home';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage = HomePage;

    constructor(platform: Platform, public db: DatabaseProvider, public globalVars: GlobalVariables) {
        platform.ready().then(() => {

            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            Splashscreen.hide();
            StatusBar.styleDefault();
            this.db.init();

            this.db.query("CREATE TABLE IF NOT EXISTS requests (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, type TEXT, url TEXT, data TEXT, done INTEGER)")
                .then(res => {
                    console.log("Result: ", res);
                })
                .catch(err => {
                    console.log("Error: ", err);
                });
        });
        let disconnectSub = Network.onDisconnect().subscribe(() => {
            console.log('you are offline');
            this.globalVars.isConnected = false;
        });

        let connectSub = Network.onConnect().subscribe(() => {
            console.log('you are online');
            this.globalVars.isConnected = true;
        });
    }
}
