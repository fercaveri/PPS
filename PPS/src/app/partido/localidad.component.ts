import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
import { HttpModule } from '@angular/http'
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
    ngOnInit() {
        this._httpService.get('/api/provincia').subscribe(values => {
            this.provincias = values.json() as object[];
        });
        //No se porque pija me tira error 404 not found
        /*this._httpService.get('/api/localidad/All').subscribe(values => {
            this.apiValues = values.json() as object[];
        });*/
        //No se porque pija me tira error 404 not found
        this._httpService.get('/api/localidad').subscribe(values => {
            this.apiValues = values.json() as object[];
        });
    }
    onSubmit(f: NgForm) {
        console.log(f.value);  // { nombre: '', provincia: '' }
        this._httpService.post('/api/localidad', f.value).subscribe();
    }
}
