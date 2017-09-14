import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
import { HttpModule} from '@angular/http'
import { NgForm } from '@angular/forms';
@Component({
    selector: 'mesa',
    templateUrl: './mesa.component.html',
    styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit {
    constructor(private _httpService: Http) { }
    mesas: object[] = [];
    ngOnInit() {
        this._httpService.get('/api/mesa').subscribe(values => {
            this.mesas = values.json() as object[];
        });
    }
    onSubmit() {
        
    }
}
