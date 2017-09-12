import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
@Component({
    selector: 'candidato',
    templateUrl: './candidato.component.html',
    styleUrls: ['./candidato.component.css']
})
export class CandidatoComponent {
    constructor(private _httpService: Http) { }
    submitted: boolean = false;
    nombre: String = "";
    apellido: String = "";
    cargo: Number = -1;
    foto: String = "";
    localidadId: number = -1;
    partidoId: number = -1;
    cargos = ['Concejal', 'Diputado Provincial', 'Diputado Nacional', 'Senador Nacional']
    localidades = [];
    provincias = [];
    partidos = [];

    ngOnInit() {
        this._httpService.get('/api/localidad').subscribe(response => {
            this.localidades = response.json() as object[];
            console.log(this.localidades);
        });
        this._httpService.get('/api/partidopolitico').subscribe(response => {
            this.partidos = response.json() as object[];
            console.log(this.partidos);
        });
    }

    onSubmit() {

        this.submitted = true;
        let loc = this.localidades.filter(x => x.id == this.localidadId)[0];
        let localidad = { id: loc.id, nombre: loc.nombreLocalidad, provincia: loc.provincia.nombreProvincia };
        console.log(loc);
        let body = {
            nombre: this.nombre,
            apellido: this.apellido,
            cargo: this.cargo,
            urlFoto: this.foto,
            localidad: localidad,
            partido: this.partidoId
        };
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        let options = new RequestOptions({ headers: headers });
        this._httpService.post('/api/candidato', body, options).subscribe(response => {
            console.log(response);
        });
    }
}
