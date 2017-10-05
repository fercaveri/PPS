import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";

export class Cargo {
    numero: number;
    nombre: string;
}

export class Provincia {
    nombreProvincia: string;
}

export class Localidad {
    id: number;
    nombreLocalidad: string;
    provincia: Provincia;
}

@Component({
  selector: 'partido-details',
  templateUrl: './partido-details.component.html',
  styleUrls: ['./partido-details.component.css']
})
export class PartidoDetailsComponent implements OnInit {

  constructor(private _httpService: Http) { }
  candidatos: object[][] = [];
  partido: String = "";
  partidos: object[] = [];
  cargos: Cargo[] = [];
  partCargados: boolean = false;
  partActual: boolean[] = [];

  ngOnInit() {
      this._httpService.get('/api/partidopolitico').subscribe(values => {
          this.partidos = values.json() as object[];
          this.partCargados = true;
      });
      this._httpService.get('/api/candidato/getcargos').subscribe(values => {
          this.cargos = values.json() as Cargo[];
          console.log(this.cargos);
      });
  }

  verLista(id: number, index: number) {
      this._httpService.get('/api/partidopolitico/getlista?numeroLista=' + id).subscribe(values => {
          console.log(values);
          this.candidatos[index] = values.json() as object[];
          this.candidatos[index].sort((a, b) => {
              if (a['cargo'] < b['cargo']) return 1;
              else if (a['cargo'] > b['cargo']) return -1;
              else return 0;
          });
      });
  }

  getCargo(id: number, loc: Localidad): any {
      console.log(loc);
      var cargo = this.cargos.filter(x => x.numero == id)[0];
      var nombre = cargo.nombre
      if (nombre == "Concejal") {
          nombre += " (" + loc.nombreLocalidad + ")";
      }
      return nombre;
  }

}
