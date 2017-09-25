import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    selector: 'page-mesas',
    templateUrl: 'mesas.html'
})
export class MesasPage {
    provincias: object[] = [];
    constructor(public navCtrl: NavController, public http: Http) {
        this.http.get('http://localhost:59472/api/provincia').map(res => res.json()).subscribe(data => {
            console.log(data);
            this.provincias = data.data.children;
        });
    }

    onLink(url: string) {
        window.open(url);
    }
}
