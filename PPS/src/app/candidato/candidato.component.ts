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
    error: boolean = false;
    nombre: String = "";
    apellido: String = "";
    cargo: Number = -1;
    foto: String = "";
    localidadId: number = -1;
    partidoId: number = -1;
    provincia: String = "";
    cargos = ['Concejal', 'Diputado Provincial', 'Diputado Nacional', 'Senador Nacional']
    localidades = [];
    fullLocalidades = [];
    provincias = [];
    partidos = [];

    ngOnInit() {
        this._httpService.get('/api/localidad').subscribe(response => {
            this.fullLocalidades = response.json() as object[];
        });
        this._httpService.get('/api/partidopolitico').subscribe(response => {
            this.partidos = response.json() as object[];
        });
        this._httpService.get('/api/provincia').subscribe(response => {
            this.provincias = response.json() as object[];
        });
        this._httpService.get('/api/localidad/true').subscribe(values => {
            this.localidades = values.json() as object[];
        });
    }

    onSubmit() {
        let localidad;
        let loc;
        if (this.cargo == 0) {
            loc = this.fullLocalidades.filter(x => x.id == this.localidadId)[0];
        }
        else if (this.cargo == 1) {
            loc = this.fullLocalidades.filter(x => x.nombreLocalidad == "" && x.provincia.nombreProvincia == this.provincia)[0];
        }
        else {
            loc = this.fullLocalidades.filter(x => x.nombreLocalidad == "" && x.provincia.nombreProvincia == "Nacional")[0];
        }
        console.log(loc);
        localidad = { id: loc.id, nombre: loc.nombreLocalidad, provincia: loc.provincia.nombreProvincia };
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
            let body = JSON.parse(response.text("legacy"));
            console.log(body.statusCode);
            if (body.statusCode == 200) {
                this.submitted = true;
            }
            else { this.error = true; }
        });
    }
}
