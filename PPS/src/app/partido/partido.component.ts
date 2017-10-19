import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
@Component({
    selector: 'partido-politico',
    templateUrl: './partido.component.html',
    styleUrls: ['./partido.component.css']
})

export class PartidoComponent implements OnInit {
    constructor(private _httpService: Http) { }
    apiValues: object[] = [];
    provincias: object[] = [];
    submitted: boolean = false;
    nombrePartido: String = "";
    provincia: String = "";
    color: String = "#ffffff";
    ngOnInit() {
        this._httpService.get('/api/partidopolitico').subscribe(values => {
            this.apiValues = values.json() as object[];
        });
        this._httpService.get('/api/provincia').subscribe(values => {
            this.provincias = values.json() as object[];
        });
    }
    onSubmit() {
        const c = { nombrePartido: this.nombrePartido, nombreProvincia: this.provincia, color: this.color };
        this._httpService.post('/api/partidopolitico', c).subscribe(response => {
            let body = JSON.parse(response.text("legacy"));
            console.log(body.statusCode);
            if (body.statusCode == 200) {
                this.submitted = true;
            }
            else {
                //TODO: ERROR
            }
            
        });
    }
}

