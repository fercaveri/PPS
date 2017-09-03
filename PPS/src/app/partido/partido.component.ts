import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
@Component({
    selector: 'partido-politico',
    templateUrl: './partido.component.html',
    styleUrls: ['./partido.component.css']
})
export class PartidoComponent implements OnInit {
    constructor(private _httpService: Http) { }
    apiValues: object[] = [];
    ngOnInit() {
        this._httpService.get('/api/partidopolitico').subscribe(values => {
            this.apiValues = values.json() as object[];
        });
    }
}
