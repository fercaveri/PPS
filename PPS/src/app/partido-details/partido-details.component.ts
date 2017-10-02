import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";

export class Cargo {
    numero: number;
    nombre: string;
}

@Component({
  selector: 'partido-details',
  templateUrl: './partido-details.component.html',
  styleUrls: ['./partido-details.component.css']
})
export class PartidoDetailsComponent implements OnInit {

  constructor(private _httpService: Http) { }
  candidatos: object[] = [];
  partido: String = "";
  partidos: object[] = [];
  cargos: Cargo[] = [];
  partCargados: boolean = false;

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

  verLista(id: number) {
      this._httpService.get('/api/partidopolitico/getlista?numeroLista=' + id).subscribe(values => {
          console.log(values);
          this.candidatos = values.json() as object[];
      });
  }

}
