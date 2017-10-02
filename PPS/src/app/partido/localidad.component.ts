import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
import { HttpModule, RequestOptions, Headers } from '@angular/http'
import { NgForm } from '@angular/forms';

export class Provincia {
    nombreProvincia: string;
}

export class Localidad {
    id: number;
    nombreLocalidad: string;
    provincia: Provincia;
}

@Component({
    selector: 'localidad',
    templateUrl: './localidad.component.html',
    styleUrls: ['./partido.component.css']
})

export class LocalidadComponent implements OnInit {
    constructor(private _httpService: Http) { }
    provincias: Provincia[] = [];
    nombreProvincia: string = "";
    nombreLocalidad: string = "";
    numeroMesas: number = 0;
    localidades: Localidad[] = [];

    // Edit y Delete
    locSeleccionada: number = 0;
    nombreLocalidadEdit: string = "";
    numeroMesasEdit: number = 0;

    // Flags
    locCargadas: boolean = false;
    mostrarAgregar: boolean = false;
    mostrarEditar: boolean = false;
    seBorro: boolean = false;
    seEdito: boolean = false;
    error: boolean = false;
    seAgrego: boolean = false;
    ngOnInit() {
        this._httpService.get('/api/provincia').subscribe(values => {
            this.provincias = values.json() as Provincia[];
        });
        this._httpService.get('/api/localidad/true').subscribe(values => {
            this.localidades = values.json() as Localidad[];
            this.locCargadas = true;
        });
    }
    onSubmit() {
        const c = { nombre: this.nombreLocalidad, provincia: this.nombreProvincia, numeroMesas: this.numeroMesas };
        this._httpService.post('/api/localidad', c).subscribe(response => {
            let body = JSON.parse(response.text("legacy"));
            console.log(body.statusCode);
            if (body.statusCode == 200) {
                this.seAgrego = true;
                this.nombreProvincia = "";
                this.nombreLocalidad = "";
                this.numeroMesas = 0;
                this._httpService.get('/api/localidad/true').subscribe(values => {
                    this.localidades = values.json() as Localidad[];
                });
            }
            else { this.error = true; }
        });
    }
    cambiarLoc(id: number): void {
        this.mostrarEditar = true;
        this.locSeleccionada = id;
        var locElegida = this.localidades.find(x => x.id == id);
        this.nombreLocalidadEdit = locElegida.nombreLocalidad;
        this._httpService.get('/api/localidad/getmesas?id=' + this.locSeleccionada).subscribe(values => {
            let body = JSON.parse(values.text("legacy"));
            console.log(body);
            this.numeroMesasEdit = values.json() as number;
        });
    }
    edit() {
        let body = { nombre: this.nombreLocalidadEdit, provincia: this.nombreProvincia, numeroMesas: this.numeroMesasEdit };
        this._httpService.patch('/api/localidad/?id=' + this.locSeleccionada, body).subscribe(response => {
            let body = JSON.parse(response.text("legacy"));
            console.log(body.statusCode);
            if (body.statusCode == 200) {
                this.seEdito = true;
                var locElegida = this.localidades.find(x => x.id == this.locSeleccionada);
                locElegida.nombreLocalidad = this.nombreLocalidadEdit;
            }
        });
    }
    delete(id: number) {
        this._httpService.delete('/api/localidad/?id=' + id).subscribe(response => {
            let body = JSON.parse(response.text("legacy"));
            console.log(body.statusCode);
            if (body.statusCode == 200) {
                this.seBorro = true;
                this._httpService.get('/api/localidad/true').subscribe(values => {
                    this.localidades = values.json() as Localidad[];
                    this.nombreLocalidadEdit = "";
                    this.numeroMesasEdit = 0;
                });
            }
        });
    }
}
