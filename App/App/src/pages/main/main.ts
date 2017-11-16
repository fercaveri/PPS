import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { GlobalVariables } from '../../providers/global-variables-provider';
import { MesasPage } from '../mesas/mesas';
import { FotoTelegramaPage } from '../fotoTelegrama/fotoTelegrama';
import { TelegramaPage } from '../telegrama/telegrama';
import { Storage } from '@ionic/storage';

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
    storage: Storage;
    constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams, public globalVars: GlobalVariables, storage: Storage) {
      this.mesa = navParams.get('mesa');
      this.rol = navParams.get('rol');
      this.mesaId = navParams.get('mesaId');
      this.localidad = navParams.get('localidad');
      this.idLocalidad = navParams.get('idLocalidad');
      this.storage = storage;
      var self = this;
      setTimeout(function () {
        console.log(self.mesa);
        console.log(self.rol);
        console.log(self.mesaId);
        console.log(self.localidad);
        console.log(self.idLocalidad);
      }, 5000)
    }

    onLink(url: string) {
        window.open(url);
    }

    navToMesas() {
      this.navCtrl.push(MesasPage, { idLocalidad: this.idLocalidad, localidad: this.localidad });
    }

    navToCargaFoto() {
        this.navCtrl.push(FotoTelegramaPage, { mesa: this.mesa, mesaId:this.mesaId });
    }

    navToTelegrama() {
      this.navCtrl.push(TelegramaPage, { mesa: this.mesa, mesaId: this.mesaId, localidad: this.localidad });
    }

    logout() {
      this.storage.remove('user');
      this.storage.remove('localidad');
      this.storage.remove('idLocalidad');
      this.storage.remove('mesa');
      this.storage.remove('mesaId');
      this.storage.set('login', false);
      this.navCtrl.pop();
    }
}
