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
        this._httpService.get('/api/localidad/All').subscribe(values => {
            this.apiValues = values.json() as object[];
        });
    }
    onSubmit(f: NgForm) {
        //Si funciona
        console.log(f.value);  // { first: '', last: '' }
        
        this._httpService.post('/api/localidad/add', f.value).subscribe();
    }
}
