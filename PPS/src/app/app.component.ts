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
    show: string = "";
    user: String;
    pass: String;
    rol: number;
    showAlert: boolean;
    logeo : boolean = false;
    ngOnInit() {
        this._httpService.get('/api/provincia').subscribe(values => {
            this.apiValues = values.json() as object[];
        });
    }
    login() {
        this._httpService.get('/api/usuario?usuario=' + this.user + '&pass=' + this.pass).subscribe(values => {
            this.rol = Number(values.text('legacy'));
            console.log(this.rol);
            this.showAlert = true;
        });
    }
    ok() {
        this.logeo = true;
    }
    logout() {
        this.logeo = false;
        this.rol = -1;
        this.showAlert = false;
        this.user = "";
        this.pass = "";
        this.show = "";
    }
}
