import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
@Component({
    selector: 'localidad',
    templateUrl: './localidad.component.html',
    styleUrls: ['./partido.component.css']
})
export class LocalidadComponent implements OnInit {
    constructor(private _httpService: Http) { }
    apiValues: object[] = [];
    ngOnInit() {
        this._httpService.get('/api/localidad?nombreProvincia=Buenos-Aires').subscribe(values => {
            this.apiValues = values.json() as object[];
        });
    }
}
