import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { ChartsModule } from 'ng2-charts';
import { Http } from '@angular/http'
import { Mesa } from '../model';

@Component({
    selector: 'app-recuento',
    templateUrl: './recuento.component.html',
    styleUrls: ['./recuento.component.css']
})
export class RecuentoComponent implements OnInit {
    localidadID: number;
    provincia: String;
    localidad: String;
    localidadObj: object;
    mesa: String;
    provincias: object[];
    localidades: object[];
    mesas: Mesa[];
    cargos = ["Concejal", "Diputado Provincial", "Diputado Nacional", "Senador Nacional"];
    cargo: number;
    messageRecuento: String;
    data: String;
    llegoData: boolean = false;
    noHayData: boolean = false;
    votos: string[];
    provinciaSeleccionada: string = "";
    votosPorProvincia: object[] = [];

    seleccionoModo: boolean = false;
    modo: String = "";

    mostrarForm(modo: String) {
        this.modo = modo;
        console.log(this.modo);
        this.seleccionoModo = true;
    }
    back() {
        this.modo = "";
        this.seleccionoModo = false;
        this.llegoData = false;
        this.provincia = "";
        this.localidad = "";
        this.localidadID = -1;
        this.mesa = "";
        this.cargo = -1;
    }

    // Pie
    pieChartLabels: string[] = [];
    pieChartIds: number[] = [];
    partidoColors: string[] = [];
    pieChartColors: any[] = [{ backgroundColor: [] }];
    pieChartData: number[] = [];
    pieChartType: string = 'pie';

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
        this._httpService.get('/api/partidopolitico/gettodo').subscribe(values => {
            var response = values.json() as object[];
            for (var i = 0; i < response.length; i++) {
                this.pieChartLabels.push(response[i]['nombre']);
                this.pieChartIds.push(response[i]['numeroLista']);
                this.partidoColors.push(response[i]['color']);
                this.pieChartColors[0]['backgroundColor'].push(response[i]['color']);
            }
            console.log(this.pieChartLabels);
            console.log(this.pieChartIds);
            console.log(this.pieChartColors);
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
        this.localidadID = this.localidadObj['id'];
        this.localidad = this.localidadObj['nombreLocalidad'];
        this._httpService.get('/api/mesa/' + this.localidad).subscribe(values => {
            this.mesas = values.json() as Mesa[];
            console.log(values);
        });
    }

    seleccionarProv(prov) {
        this.provinciaSeleccionada = prov;
        let votosPorPartido = [];
        for (let i = 0; i < this.provincias.length; i++) {
            if (this.votosPorProvincia[i]['provincia'] == this.provinciaSeleccionada) {
                votosPorPartido = this.votosPorProvincia[i]['partidos'];
            }
        }
        this.pieChartData = new Array;
        for (var i = 0; i < votosPorPartido.length; i++) {
            this.pieChartData[this.pieChartIds.indexOf(votosPorPartido[i].id)] = votosPorPartido[i].votos;
        }
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
            this.noHayData = false;
            this.llegoData = true;
        }
        console.log(prov);
        console.log(this.pieChartData);
        this.messageRecuento = 'Resultados de votacion sobre ' + this.cargos[this.cargo] + ' en la provincia de ' + prov;
    }

    mostrarDatos() {
        this.data = "";
        var request = this.getRequest();
        this._httpService.get(request + 'cargo=' + this.cargo).subscribe(values => {
            if (this.modo != 'provincia') {
                let body = JSON.parse(values.text("legacy"));
                for (var i = 0; i < body.length; i++) {
                    this.pieChartData[this.pieChartIds.indexOf(body[i].id)] = body[i].votos;
                }
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
            }
            else if (this.modo == 'provincia') {
                this.votosPorProvincia = JSON.parse(values.text("legacy"));
                this.llegoData = true;
                for (let i = 0; i < this.votosPorProvincia.length; i++) {
                    let htmlID = 'map-' + this.votosPorProvincia[i]['provincia'].toLowerCase().replace(/ /g, "-");
                    if (htmlID == 'map-nacional') continue;
                    let elem = document.getElementById(htmlID);
                    let partidos = this.votosPorProvincia[i]['partidos'];
                    let color = "";
                    let higher = 0;
                    for (let j = 0; j < partidos.length; j++) {
                        if (higher < partidos[j]['votos']) {
                            higher = partidos[j]['votos'];
                            color = this.partidoColors[this.pieChartIds.indexOf(partidos[j]['id'])];
                        }
                    }
                    elem.setAttribute('fill', color);
                }
            }
        });
    }
    getRequest(): String {
        if (this.modo == 'pais') {
            this.messageRecuento = 'Resultados de votacion sobre ' + this.cargos[this.cargo] + ' en todo el país';
            return '/api/recuento/todosporpais?'
        } else if (this.modo == 'provincia') {
            this.messageRecuento = 'Elija una provincia para mirar las estadisticas';
            return '/api/recuento/todosporprovincia?'
        } else if (this.modo == 'localidad') {
            this.messageRecuento = 'Resultados de votacion sobre ' + this.cargos[this.cargo] + ' en la localidad de ' + this.localidad;
            return '/api/recuento/todosporunalocalidad?localidad=' + this.localidadID + '&'
        } else {
            var numeroMesa;
            for (let mesa of this.mesas) {
                if (mesa.id == +this.mesa) {
                    numeroMesa = mesa.numero;
                }
            }
            this.messageRecuento = 'Resultados de votacion sobre ' + this.cargos[this.cargo] + ' en la mesa ' + numeroMesa + ' de la localidad  ' + this.localidad;
            return '/api/recuento/votoxmesa?idMesa=' + this.mesa + '&'
        }
    }
}
