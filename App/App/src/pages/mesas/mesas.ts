import { Component } from '@angular/core';
import { GlobalVariables } from '../../providers/global-variables-provider';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { TelegramaPage } from '../telegrama/telegrama';
import 'rxjs/add/operator/map';
import { config } from "../../config";
import { FotoTelegramaPage } from '../fotoTelegrama/fotoTelegrama';

@Component({
    selector: 'page-mesas',
    templateUrl: 'mesas.html'
})
export class MesasPage {
    provincias: object[] = [];
    provincia: String = "";
    localidadesProvincia: object[] = [];
    localidad: String = "";
    mesa: number = 0;
    mesasLocalidades: object[] = [];
    apiUrl: String;
    tienePermisos: boolean = true;
    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public globalVars: GlobalVariables) {
        console.log('localidadid:' + navParams.get('idLocalidad'));

        console.log('localidad:' + navParams.get('localidad'));
        if (navParams.get('idLocalidad') != -1) {
          this.localidad = navParams.get('localidad');
          this.buscarMesas(this.localidad);
          this.tienePermisos = false;
        }
        else {
          this.http.get(this.globalVars.apiUrl + '/api/provincia').map(res => res.json()).subscribe(data => {
            console.log(data);
            this.provincias = data;
          });
        }
    }

    onChange(nombre: String) {
        this.provincia = nombre;
        console.log(this.provincia);
        this.http.get(this.globalVars.apiUrl +'/api/localidad/'+this.provincia+'/').map(res => res.json()).subscribe(data => {
            console.log(data);
            this.localidadesProvincia = data;
        });
    }
    buscarMesas(nombre: String) {
        this.localidad = nombre;
        console.log(this.localidad);
        this.http.get(this.globalVars.apiUrl +'/api/mesa/' + this.localidad + '/').map(res => res.json()).subscribe(data => {
            console.log(data);
            this.mesasLocalidades = data;
        });
    }
    buscarCandidatos(mesa: number) {
        this.mesa = mesa;
        console.log(mesa);
        console.log(this.mesa);
    }

    nav() {
        this.navCtrl.push(TelegramaPage, { mesa: this.mesa, localidad: this.localidad });
    }
    photo() {
      this.navCtrl.push(FotoTelegramaPage, { mesa: this.mesa, localidad: this.localidad,  apiUrl: this.apiUrl });
    }
}
