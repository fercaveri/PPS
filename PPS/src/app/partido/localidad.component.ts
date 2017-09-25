import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
import { HttpModule, RequestOptions, Headers } from '@angular/http'
import { NgForm } from '@angular/forms';
@Component({
    selector: 'localidad',
    templateUrl: './localidad.component.html',
    styleUrls: ['./partido.component.css']
})
export class LocalidadComponent implements OnInit {
    constructor(private _httpService: Http) { }
    apiValues: object[] = [];
    provincias : object[] = [];
    nombreProvincia: String = "";
    nombreLocalidad: String = "";
    localidades: object[] = [];
    seBorro: boolean = false;
    error: boolean = false;
    seAgrego: boolean = false;
    ngOnInit() {
        this._httpService.get('/api/provincia').subscribe(values => {
            this.provincias = values.json() as object[];
        });
        /*this._httpService.get('/api/localidad').subscribe(values => {
            this.apiValues = values.json() as object[];
        });*/
        this._httpService.get('/api/localidad/cordoba').subscribe(values => {
            this.localidades = values.json() as object[];
        });
    }
    onSubmit() {
        const c = { nombre: this.nombreLocalidad , provincia: this.nombreProvincia };
        this._httpService.post('/api/localidad', c).subscribe(response => {
            let body = JSON.parse(response.text("legacy"));
            console.log(body.statusCode);
            if (body.statusCode == 200) { this.seAgrego = true; }
            else { this.error = true; }
        });
    }
    delete() {
        this._httpService.delete('/api/localidad/?nombre=' + this.nombreLocalidad).subscribe(response => {
            let body = JSON.parse(response.text("legacy"));
            console.log(body.statusCode);
            if (body.statusCode == 200) { this.seBorro = true; }
        });
    }
}
