import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { AlertController, NavController, NavParams } from 'ionic-angular';

import { MesasPage } from '../mesas/mesas';
import { FotoTelegramaPage } from '../fotoTelegrama/fotoTelegrama';
import { TelegramaPage } from '../telegrama/telegrama';

@Component({
    selector: 'page-main',
    templateUrl: 'main.html'
})
export class MainPage {
    mesa: number;
    localidad: String;
    rol: number;
    apiUrl: String;
    constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams) {
      this.mesa = navParams.get('mesa');
      this.rol = navParams.get('rol');
      this.localidad = navParams.get('localidad');
      this.apiUrl = navParams.get('apiUrl');
    }

    onLink(url: string) {
        window.open(url);
    }

    navToMesas() {
        this.navCtrl.push(MesasPage, {apiUrl: this.apiUrl});
    }

    navToCargaFoto() {
        this.navCtrl.push(FotoTelegramaPage, { mesa: this.mesa, apiUrl: this.apiUrl });
    }

    navToTelegrama() {
        this.navCtrl.push(TelegramaPage, { mesa: this.mesa, localidad: this.localidad, apiUrl: this.apiUrl });
    }
}
