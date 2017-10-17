import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
import { DomSanitizer } from '@angular/platform-browser';
export class Partido {
    public votos0: number;
    public votos1: number;
    public votos2: number;
    public votos3: number;
}
@Component({
  selector: 'app-telegrama',
  templateUrl: './telegrama.component.html',
  styleUrls: ['./telegrama.component.css']
})
export class TelegramaComponent implements OnInit {
  provincia: String;
  localidad: String;
  mesa: String;
  provincias: object[];
  localidades: object[];
  mesas: object[];
  cargos = ["Concejal", "Diputado Provincial", "Diputado Nacional", "Senador Nacional"];
  partidos: String[];
  votos: Partido[] = [];
  hayTelegrama: boolean;
  alerta: boolean;
  base64Image;
  constructor(private _httpService: Http, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
      this._httpService.get('/api/provincia').subscribe(values => {
          this.provincias = values.json() as object[];
          console.log(this.provincias);
      });
      
  }

  loadLocalidad() {
      this._httpService.get('/api/localidad/getbyprov?provincia=' + this.provincia).subscribe(values => {
          this.localidades = values.json() as object[];
          console.log(values);
      });
  }
  loadMesas() {
      this._httpService.get('/api/mesa/'+ this.localidad).subscribe(values => {
          this.mesas = values.json() as object[];
          console.log(values);
      });
  }
  mostrarTelegrama() {
      console.log(this.mesa);
      this._httpService.get('/api/telegrama?numeroMesa=' + this.mesa).subscribe(values => {
          if (values != null) {
              let body = values.text("legacy");
              this.base64Image = body;
              console.log(body);
              this.hayTelegrama = true;
              this.alerta = false;
          }
          else {
              this.alerta = true;
              this.hayTelegrama = false;
          }
          
      });
      this._httpService.get('/api/partidopolitico/getnombres').subscribe(values => {
          this.partidos = values.json() as String[];
          console.log(this.partidos);
          for (let partido of this.partidos) {
              this.votos.push(new Partido());
          }
          for (var j = 0; j < this.votos.length ; j++) {
              for (var i = 0; i < this.cargos.length; i++) {
                  var request = '/api/recuento/votoxmesa?idMesa=' + this.mesa + '&cargo=' + i + '&partido=' + this.partidos[j];
                  console.log(request);
                  var cantVotos = this.pedirVotos(request,j,i);
              }
          }
      }); 
    }
    save() {
        console.log(this.votos);
    }
    pedirVotos(request: string, pos: number, cargo: number): number {
        var cantVotos;
        this._httpService.get(request).subscribe(values => {
            var cantVotos = +values.text('legacy');
            console.log("Setie : " + cantVotos);
            if (cargo == 0) {
                this.votos[pos].votos0 = cantVotos;
            } else if (cargo == 1) {
                this.votos[pos].votos1 = cantVotos;
            } else if (cargo == 2) {
                this.votos[pos].votos2 = cantVotos;
            } else {
                this.votos[pos].votos3 = cantVotos;
            }
        });
        return cantVotos;
    }
}
