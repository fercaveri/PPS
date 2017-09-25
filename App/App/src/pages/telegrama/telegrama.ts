import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    selector: 'telegrama',
    templateUrl: 'telegrama.html'
})
export class TelegramaPage{
    partidos: Partido[] = [];
    candidatos: Candidato[] = [];
    candidatosPartido: object[] = [];
    mesa: number = 0;
    localidad: String = "";
    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
        this.mesa = navParams.get('mesa');
        this.localidad = navParams.get('localidad');
        console.log(this.localidad);
        this.getPartidos();
        this.getCandidatos();
    }
    logForm() {
        console.log(this.candidatos)
        for (let cand of this.candidatos) {
            const c = {
                mesa: this.mesa,
                votos: cand.votos,
                candidato: cand.id
            };
            this.http.post('http://localhost:59473/api/recuento', c).subscribe(response => {
                console.log(response.status);
            });
        }
    }
    getPartidos() {
        this.http.get('http://localhost:59473/api/partidopolitico').map(res => res.json()).subscribe(data => {
            this.partidos = data;
            console.log(this.partidos);
        });
    }
    getCandidatos() {
        this.http.get('http://localhost:59473/api/candidato/' + this.localidad + '/').map(res => res.json()).subscribe(data => {
            this.candidatos = data;
            console.log(this.candidatos);
        });
    }
}

class Partido {
    numeroLista: number;
    nombre: String;
    provincia: String;
}
class Candidato {
    apellido: String;
    cargo: number;
    id: number;
    localidad: object;
    nombre: String;
    nombreCompleto: String;
    partido: Partido;
    urlFoto: String;
    votos: number;
}
