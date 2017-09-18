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
    seBorro: boolean = false;
    error: boolean = false;
    seAgrego: boolean = false;
    ngOnInit() {
        this._httpService.get('/api/provincia').subscribe(values => {
            this.provincias = values.json() as object[];
        });
        this._httpService.get('/api/localidad').subscribe(values => {
            this.apiValues = values.json() as object[];
        });
    }
    onSubmit() {
        const c = { nombre: this.nombreLocalidad , provincia: this.nombreProvincia };
        this._httpService.post('/api/localidad', c).subscribe(response => {
            console.log(response.text);
            console.log(response.statusText);
            if (response) { this.seAgrego = true; }
            else { this.error = true; }
        });
    }
    delete() {
        this._httpService.delete('/api/localidad/?nombre=' + this.nombreLocalidad).subscribe(response => {
            console.log(response.text);
            console.log(response.statusText);
            if (response.status == 200) { this.seBorro = true; }
        });
    }
}
