import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'

export class Provincia {
    nombreProvincia: string;
}

export class Localidad {
    id: number;
    nombreLocalidad: string;
    provincia: Provincia;
}

export class Partido {
    numeroLista : number;
    nombre: String;
    provincia: Provincia;
}

export class Candidato {
    id: number;
    nombre: number;
    apellido: string;
    localidad: Localidad;
    cargo: number;
    urlFoto: string;
    partido: Partido;
}

@Component({
    selector: 'candidato-details',
    templateUrl: './candidato-details.component.html',
    styleUrls: ['./candidato-details.component.css']
})

export class CandidatoDetailsComponent implements OnInit {

  constructor(private _httpService: Http) { }
  candidatos: Candidato[] = [];
  eligioCandidato: boolean = false;
  candidatoElegido: number = -1;
  ngOnInit() {
      this._httpService.get('/api/candidato').subscribe(values => {
          this.candidatos = values.json() as Candidato[];
          console.log(this.candidatos);
      });
  }
  details() {
      this.eligioCandidato = true;
  }
  edit() {

  }
  delete() {
      this._httpService.delete('/api/candidato/?id=' + this.candidatoElegido).subscribe(response => {
          if (response.ok) {
              this.candidatos = this.candidatos.filter(cand => cand.id !== this.candidatoElegido);
              console.log(response);
          }
      });
  }
}
