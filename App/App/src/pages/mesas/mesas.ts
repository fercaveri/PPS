import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { TelegramaPage } from '../telegrama/telegrama';
import 'rxjs/add/operator/map';

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
    constructor(public navCtrl: NavController, public http: Http) {
        this.http.get('http://localhost:59473/api/provincia').map(res => res.json()).subscribe(data => {
            console.log(data);
            this.provincias = data;
        });
    }

    onChange(nombre: String) {
        this.provincia = nombre;
        console.log(this.provincia);
        this.http.get('http://localhost:59473/api/localidad/'+this.provincia+'/').map(res => res.json()).subscribe(data => {
            console.log(data);
            this.localidadesProvincia = data;
        });
    }
    buscarMesas(nombre: String) {
        this.localidad = nombre;
        console.log(this.localidad);
        this.http.get('http://localhost:59473/api/mesa/' + this.localidad + '/').map(res => res.json()).subscribe(data => {
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
}
