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
    pocosVotos: boolean = false;
    cantVotos: number = 0;
    mesasTotales: number = 0;
    escrute: boolean = false;

    votosPredecidos: number[] = [0,0,0,0];
    predije: boolean = false;
    votantes: number = 0;
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
        this.predije = false;
        this.pocosVotos = false;
        this.localidades = [];
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
        this.cantVotos = 0;
        this.mesasTotales = 0;
        this.votantes = 0;
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
        for (let i of this.pieChartData) {
          this.cantVotos += i;
        }
        console.log("cantidad votos:" + this.cantVotos);
        this._httpService.get('/api/mesa/cantidadProvincia?idProvincia=' + prov).subscribe(values => {
          this.mesasTotales = values.json();
          console.log('cantidadMesas:' + this.mesasTotales);
          console.log('cantidadVotantesTotales:' + this.mesasTotales * 350);
          this.votantes = this.cantVotos * 100 / (this.mesasTotales * 350);
          console.log('porcentaje:' + this.votantes);
          this.escrute = true;
        });
    }

    mostrarDatos() {
        this.data = "";
        this.cantVotos = 0;
        this.mesasTotales = 0;
        this.votantes = 0;
        var request = this.getRequest();
        this._httpService.get(request + 'cargo=' + this.cargo).subscribe(values => {
          if (this.modo != 'provincia') {
            let body = JSON.parse(values.text("legacy"));
            this.pieChartData = new Array;
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
          for (let i of this.pieChartData) {
            this.cantVotos += i;
          }
          console.log("cantidad votos:" + this.cantVotos);
          if (this.modo == 'pais') {
            this._httpService.get('/api/mesa/cantidadPais').subscribe(values => {
              this.mesasTotales = values.json();
              console.log('cantidadMesas:' + this.mesasTotales);
              console.log('cantidadVotantesTotales:' + this.mesasTotales * 350);
              this.votantes = this.cantVotos * 100 / (this.mesasTotales * 350);
              this.escrute = true;
            });}
          if (this.modo == 'localidad') {
            this._httpService.get('/api/mesa/cantidad?idLocalidad=' + this.localidadID).subscribe(values => {
              this.mesasTotales = values.json();
              console.log('cantidadMesas:' + this.mesasTotales);
              console.log('cantidadVotantesTotales:' + this.mesasTotales * 350);
              this.votantes = this.cantVotos * 100 / (this.mesasTotales * 350);
              this.escrute = true;
            });}
          else {
            if (this.cantVotos > 350) {
              this.votantes = 100;
            }
            else {
              this.votantes = this.cantVotos * 100 / 350;
            }
            this.escrute = true;
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
            return '/api/recuento/todosporunalocalidad?localidadID=' + this.localidadID + '&'
        } else {
            var numeroMesa;
            for (let mesa of this.mesas) {
                if (mesa.id == +this.mesa) {
                    numeroMesa = mesa.numero;
                }
            }
            this.messageRecuento = 'Resultados de votacion sobre ' + this.cargos[this.cargo] + ' en la mesa ' + numeroMesa + ' de la localidad  ' + this.localidad;
            return '/api/recuento/todosporunamesa?mesa=' + this.mesa + '&localidadID=' + this.localidadID + '&'
        }
    }

    predecir() {
      console.log(this.mesa);
      console.log(this.localidadID);
      console.log(this.cargo);
      this.votosPredecidos = [0,0,0,0];
      if (this.modo == 'pais') {
        console.log("cantidad votos:" + this.cantVotos);
        this.predije = true;
        this.pocosVotos = false;
        this._httpService.get('/api/recuento/predecirPais?cargo=' + this.cargo).subscribe(values => {
          this.votosPredecidos = values.json();
          for (var i = 0; i < this.votosPredecidos.length; i++) {
            var porcentajeActual = (this.pieChartData[i] * 100 / this.cantVotos);
            this.votosPredecidos[i] = (this.votosPredecidos[i] + porcentajeActual as number) / 2;
          }
        });
      } else if (this.modo == 'provincia') {
        console.log("cantidad votos:" + this.cantVotos);
        this.predije = true;
        this.pocosVotos = false;
        this._httpService.get('/api/recuento/predecirProvincia?idProvincia=' + this.provinciaSeleccionada + '&cargo=' + this.cargo).subscribe(values => {
          this.votosPredecidos = values.json();
          for (var i = 0; i < this.votosPredecidos.length; i++) {
            var porcentajeActual = (this.pieChartData[i] * 100 / this.cantVotos);
            this.votosPredecidos[i] = (this.votosPredecidos[i] + porcentajeActual as number) / 2;
          }
        });
      } else if (this.modo == 'localidad') {
        console.log("cantidad votos:" + this.cantVotos);
        this.predije = true;
        this.pocosVotos = false;
        this._httpService.get('/api/recuento/predecirLocalidad?idLocalidad=' + this.localidadID + '&cargo=' + this.cargo).subscribe(values => {
          this.votosPredecidos = values.json();
          for (var i = 0; i < this.votosPredecidos.length; i++) {
            var porcentajeActual = (this.pieChartData[i] * 100 / this.cantVotos);
            this.votosPredecidos[i] = (this.votosPredecidos[i] + porcentajeActual as number) / 2;
          }
        });
      } else {
        console.log("cantidad votos:" + this.cantVotos);
        if (this.votantes < 60) {
          this.predije = true;
          this.pocosVotos = false;
          this._httpService.get('/api/recuento/predecirMesa?idMesa=' + this.mesa + '&idLocalidad=' + this.localidadID + '&cargo=' + this.cargo).subscribe(values => {
            this.votosPredecidos = values.json();
            for (var i = 0; i < this.votosPredecidos.length; i++) {
              var porcentajeActual = (this.pieChartData[i] * 100 / this.cantVotos);
              this.votosPredecidos[i] = (this.votosPredecidos[i] + porcentajeActual as number) / 2;
            }
          });
        } else {
          this.predije = false;
          this.pocosVotos = true;
        }

      }
    }
}
