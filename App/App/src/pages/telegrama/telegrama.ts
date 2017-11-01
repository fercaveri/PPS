import { Component } from '@angular/core';
import { GlobalVariables } from '../../providers/global-variables-provider';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { config } from "../../config";

@Component({
    selector: 'telegrama',
    templateUrl: 'telegrama.html'
})
export class TelegramaPage{
    partidos: Partido[] = [];
    candidatos: Candidato[] = [];
    candidatosPartido: object[] = [];
    recuento: Recuento[] = [];
    mesa: number = 0;
    localidad: String = "";
    isEdit: boolean = false;
    apiUrl: String;
    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public globalVars: GlobalVariables) {
        this.mesa = navParams.get('mesa');
        this.localidad = navParams.get('localidad');
        console.log(this.localidad);
        this.getPartidos();
        this.getCandidatos();
        this.getRecuento();
    }
    logForm() {
        console.log(this.candidatos)
        for (let cand of this.candidatos) {
            const c = {
                mesa: this.mesa,
                votos: cand.votos,
                candidato: cand.id
            };
            if (this.isEdit) {
                this.http.patch(this.globalVars.apiUrl +'/api/recuento', c).subscribe(response => {
                    console.log(response.status);
                });
            }
            else {
                this.http.post(this.globalVars.apiUrl +'/api/recuento', c).subscribe(response => {
                    console.log(response.status);
                });
            }
        }
    }
    getPartidos() {
        this.http.get(this.globalVars.apiUrl +'/api/partidopolitico').map(res => res.json()).subscribe(data => {
            this.partidos = data;
            console.log(this.partidos);
        });
    }
    getCandidatos() {
        this.http.get(this.globalVars.apiUrl +'/api/candidato/' + this.localidad + '/').map(res => res.json()).subscribe(data => {
            this.candidatos = data;
            console.log(this.candidatos);
        });
    }
    getRecuento() {
        this.http.get(this.globalVars.apiUrl +'/api/recuento?idMesa=' + this.mesa).map(res => res.json()).subscribe(data => {
            this.recuento = data;
            console.log(this.recuento);
            if (this.recuento.length > 0) {

                console.log(this.candidatos);
                this.isEdit = true;
                for (var i = 0; i < this.candidatos.length; i++) {
                    for (var j = 0; j < this.recuento.length; j++) {
                        if (this.candidatos[i].id == this.recuento[j].candidato.id) {
                            this.candidatos[i].votos = this.recuento[j].votos;
                        }
                    }
                }

                console.log(this.candidatos);
            }
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
class Recuento {
    candidato: Candidato;
    id: number;
    mesa: object;
    votos: number;
}
