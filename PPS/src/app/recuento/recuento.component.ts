import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { ChartsModule } from 'ng2-charts';
import { Http } from '@angular/http'

@Component({
  selector: 'app-recuento',
  templateUrl: './recuento.component.html',
  styleUrls: ['./recuento.component.css']
})
export class RecuentoComponent implements OnInit {
    provincia: String;
    localidad: String;
    mesa: String;
    provincias: object[];
    localidades: object[];
    mesas: object[];
    cargos = ["Concejal", "Diputado Provincial", "Diputado Nacional", "Senador Nacional"];
    cargo: number;

    data: String;
    llegoData: boolean = false;
    noHayData: boolean = false;
    votos: string[];

    // Pie
    public pieChartLabels: string[] ;
    public pieChartData: number[];
    public pieChartType: string = 'pie';

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
    constructor(private _httpService: Http) {

    }

    ngOnInit() {
        this._httpService.get('/api/provincia').subscribe(values => {
            this.provincias = values.json() as object[];
            console.log(this.provincias);
        });
        this._httpService.get('/api/partidopolitico/getnombres').subscribe(values => {
            this.pieChartLabels = values.json() as string[];
            console.log(this.pieChartLabels);
        });
    }
    getCargo() {
        return this.cargos[this.cargo];
    }
    loadLocalidad() {
        this._httpService.get('/api/localidad/getbyprov?provincia=' + this.provincia).subscribe(values => {
            this.localidades = values.json() as object[];
            console.log(values);
        });
    }
    loadMesas() {
        this._httpService.get('/api/mesa/' + this.localidad).subscribe(values => {
            this.mesas = values.json() as object[];
            console.log(values);
        });
    }

    mostrarDatos() {
        this.data = "";
        for (var i = 0; i < this.pieChartLabels.length; i++) {
            if (i != this.pieChartLabels.length - 1) {
                this._httpService.get('/api/recuento/votoxmesa?idMesa='+this.mesa+'&cargo=' + this.cargo + '&partido=' + this.pieChartLabels[i]).subscribe(values => {
                    var cantVotos = values.text('legacy');
                    this.data = this.data + cantVotos + ',';
                    console.log(this.data);
                });
            } else {
                this._httpService.get('/api/recuento/votoxmesa?idMesa='+this.mesa+'&cargo=' + this.cargo + '&partido=' + this.pieChartLabels[i]).subscribe(values => {
                    var cantVotos = values.text('legacy');
                    this.data = this.data + cantVotos;
                    console.log(this.data);
                    this.pieChartData = this.data.split(',').map(Number);
                    console.log(this.pieChartLabels);
                    console.log(this.pieChartData);
                    var flag = false;
                    for (let i of this.pieChartData) {
                        if (i > 0) {
                            flag = true;
                        }
                    }
                    if (flag == false) {
                        this.noHayData = true;
                        this.llegoData = false;
                    }
                    else {
                        this.llegoData = true;
                        this.noHayData = false;
                    }
                });
            }
        }
    }
}
