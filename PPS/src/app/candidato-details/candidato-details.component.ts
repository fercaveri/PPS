import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'

export class Provincia {
    nombreProvincia: string;
}

export class Localidad {
    id: number;
    nombreLocalidad: string;
    provincia: Provincia;
}

export class Partido {
    numeroLista: number;
    nombre: String;
    provincia: Provincia;
}

export class Candidato {
    id: number;
    nombre: number;
    apellido: string;
    localidad: Localidad;
    cargo: number;
    urlFoto: string;
    partido: Partido;
}

export class Cargo {
    numero: number;
    nombre: string;
}

@Component({
    selector: 'candidato-details',
    templateUrl: './candidato-details.component.html',
    styleUrls: ['./candidato-details.component.css']
})

export class CandidatoDetailsComponent implements OnInit {

    constructor(private _httpService: Http) { }
    candidatos: Candidato[] = [];
    eligioCandidato: boolean = false;
    candidatoElegido: number = -1;
    candidatoEditado: Candidato;
    nombre: number;
    apellido: string;
    localidad: Localidad;
    cargo: number;
    urlFoto: string;
    partido: Partido;
    partidos: object[] = [];
    localidades: Localidad[] = [];
    provincias: Provincia[] = []
    cargos: Cargo[] = [];

    ngOnInit() {
        this._httpService.get('/api/candidato').subscribe(values => {
            this.candidatos = values.json() as Candidato[];
            console.log(this.candidatos);
        });
        this._httpService.get('/api/candidato/getcargos').subscribe(values => {
            this.cargos = values.json() as Cargo[];
            console.log(this.cargos);
        });
    }
    details() {
        this.eligioCandidato = true;
        console.log(this.candidatoElegido);
        this.candidatoEditado = this.candidatos.find(x => x.id == this.candidatoElegido);
        console.log(this.candidatoEditado);
        this._httpService.get('/api/partidopolitico').subscribe(values => {
            this.partidos = values.json() as object[];
        });
        this._httpService.get('/api/provincia').subscribe(values => {
            this.provincias = values.json() as Provincia[];
        });
        this._httpService.get('/api/localidad/getbyprov?provincia=' + this.candidatoEditado.localidad.provincia.nombreProvincia).subscribe(values => {
            this.localidades = values.json() as Localidad[];
        });
    }
    reloadPartidos(event: Event): void {
        this._httpService.get('/api/localidad/getbyprov?provincia=' + this.candidatoEditado.localidad.provincia.nombreProvincia).subscribe(values => {
            this.localidades = values.json() as Localidad[];
        });
    }
    edit() {
        let body = {
            nombre: this.candidatoEditado.nombre,
            apellido: this.candidatoEditado.apellido,
            cargo: this.candidatoEditado.cargo,
            urlFoto: this.candidatoEditado.urlFoto,
            localidad: this.candidatoEditado.localidad,
            partido: this.candidatoEditado.partido.numeroLista
        };
        console.log(body);
        this._httpService.patch('/api/candidato/?id=' + this.candidatoElegido, body).subscribe();
    }
    delete() {
        this._httpService.delete('/api/candidato/?id=' + this.candidatoElegido).subscribe(response => {
            if (response.ok) {
                this.candidatos = this.candidatos.filter(cand => cand.id !== this.candidatoElegido);
                console.log(response);
            }
        });
    }
}
