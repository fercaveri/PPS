import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { AlertController, NavController, NavParams } from 'ionic-angular';

import { MesasPage } from '../mesas/mesas';
import { FotoTelegramaPage } from '../fotoTelegrama/fotoTelegrama';

@Component({
    selector: 'page-main',
    templateUrl: 'main.html'
})
export class MainPage {
    mesa: number;
    constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams) {
        this.mesa = navParams.get('mesa');
    }

    onLink(url: string) {
        window.open(url);
    }

    navToMesas() {
        this.navCtrl.push(MesasPage);
    }

    navToCargaFoto() {
        this.navCtrl.push(FotoTelegramaPage, { mesa: this.mesa });
    }
}
