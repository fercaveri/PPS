import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
import { DomSanitizer } from '@angular/platform-browser';

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
      this._httpService.get('/api/telegrama').subscribe(values => {
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
      });
  }

}
