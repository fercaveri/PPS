import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private _httpService: Http) { }
    apiValues: object[] = [];
    ngOnInit() {
        this._httpService.get('/api/provincia').subscribe(values => {
            this.apiValues = values.json() as object[];
        });
    }
}
