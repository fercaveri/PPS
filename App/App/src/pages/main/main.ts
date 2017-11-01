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
    mesaId: number;
    apiUrl: String;
    idLocalidad: number;
    constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams) {
      this.mesa = navParams.get('mesa');
      this.rol = navParams.get('rol');
      this.mesaId = navParams.get('mesaId');
      this.localidad = navParams.get('localidad');
      this.apiUrl = navParams.get('apiUrl');
      this.idLocalidad = navParams.get('idLocalidad');
    }

    onLink(url: string) {
        window.open(url);
    }

    navToMesas() {
      this.navCtrl.push(MesasPage, { apiUrl: this.apiUrl, idLocalidad: this.idLocalidad, localidad: this.localidad });
    }

    navToCargaFoto() {
        this.navCtrl.push(FotoTelegramaPage, { mesa: this.mesa, mesaId:this.mesaId ,apiUrl: this.apiUrl });
    }

    navToTelegrama() {
      this.navCtrl.push(TelegramaPage, { mesa: this.mesa, mesaId: this.mesaId, localidad: this.localidad, apiUrl: this.apiUrl });
    }
}
