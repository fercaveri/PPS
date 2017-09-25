import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    selector: 'telegrama',
    templateUrl: 'telegrama.html'
})
export class TelegramaPage {
    partidos: object[] = [];
    candidatos: object[] = [];
    candidatosPartido: object[] = [];
    constructor(public navCtrl: NavController, public http: Http) {
        this.getPartidos();
        this.getCandidatos();
    }
    getPartidos() {
        this.http.get('http://localhost:59473/api/partidopolitico').map(res => res.json()).subscribe(data => {
            console.log(data);
            this.partidos = data;
        });
    }
    getCandidatos() {
        this.http.get('http://localhost:59473/api/candidato').map(res => res.json()).subscribe(data => {
            console.log(data);
            this.candidatos = data;
        });
    }
}
