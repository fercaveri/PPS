import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { GlobalVariables } from '../../providers/global-variables-provider';
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
    constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams, public globalVars: GlobalVariables) {
      this.mesa = navParams.get('mesa');
      this.rol = navParams.get('rol');
      this.localidad = navParams.get('localidad');
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

    navToTelegrama() {
        this.navCtrl.push(TelegramaPage, { mesa: this.mesa, localidad: this.localidad });
    }
}
