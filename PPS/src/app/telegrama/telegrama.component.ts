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
  partidos: object[];
  votos: Partido[] = [];
  hayTelegrama: boolean;
  alerta: boolean;
  base64Image;
  edicion: boolean = false;
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
      this._httpService.get('/api/partidopolitico/gettodo').subscribe(values => {
          this.partidos = values.json() as object[];
          console.log(this.partidos);
          for (let partido of this.partidos) {
              this.votos.push(new Partido());
          }
          for (var j = 0; j < this.votos.length ; j++) {
              for (var i = 0; i < this.cargos.length; i++) {
                  var request = '/api/recuento/votoxmesa?idMesa=' + this.mesa + '&cargo=' + i + '&partido=' + this.partidos[j]['nombre'];
                  var cantVotos = this.pedirVotos(request,j,i);
              }
          }
      }); 
    }
    habilitarEdicion() {
      this.edicion = true;
    }
    atras() {
      this.edicion = false;
    }
    save() {
        console.log(this.votos);
        /*const c = { mesa: 1, candidato: 3, votos: 69, partido: 'pro' };
        this._httpService.patch('/api/recuento/editxmesa', c).subscribe(values => { console.log(values) });*/
        for (var j = 0; j < this.votos.length; j++) {
            for (var i = 0; i < this.cargos.length; i++) {
                if (i == 0) {
                    const c = { mesa: this.mesa, candidato: i, votos: this.votos[j].votos0, partido: this.partidos[j]['nombre'] };
                    this._httpService.patch('/api/recuento/editxmesa', c).subscribe(values => { console.log(values) });
                } else if (i == 1) {
                    const c = { mesa: this.mesa, candidato: i, votos: this.votos[j].votos1, partido: this.partidos[j]['nombre'] };
                    this._httpService.patch('/api/recuento/editxmesa', c).subscribe(values => { console.log(values) });
                } else if (i == 2) {
                    const c = { mesa: this.mesa, candidato: i, votos: this.votos[j].votos2, partido: this.partidos[j]['nombre'] };
                    this._httpService.patch('/api/recuento/editxmesa', c).subscribe(values => { console.log(values) });
                } else {
                    const c = { mesa: this.mesa, candidato: i, votos: this.votos[j].votos3, partido: this.partidos[j]['nombre'] };
                    this._httpService.patch('/api/recuento/editxmesa', c).subscribe(values => { console.log(values) });
                }
                
            }
        }
        this.edicion = false;
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
