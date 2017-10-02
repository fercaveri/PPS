import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { AlertController, NavController } from 'ionic-angular';

import { MesasPage } from '../mesas/mesas';
import { TelegramaPage } from '../telegrama/telegrama';

@Component({
    selector: 'page-main',
    templateUrl: 'main.html'
})
export class MainPage {
    constructor(public navCtrl: NavController, public http: Http) {
    }

    onLink(url: string) {
        window.open(url);
    }

    navToMesas() {
        this.navCtrl.push(MesasPage);
    }

    navToGrilla() {
        this.navCtrl.push(TelegramaPage);
    }
}
