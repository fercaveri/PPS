import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'

@Component({
  selector: 'candidato-details',
  templateUrl: './candidato-details.component.html',
  styleUrls: ['./candidato-details.component.css']
})
export class CandidatoDetailsComponent implements OnInit {

  constructor(private _httpService: Http) { }
  candidatos: object[] = [];
  eligioCandidato: boolean = false;
  candidatoElegido: number = -1;
  ngOnInit() {
      this._httpService.get('/api/candidato?nombre=gaston&apellido=sturla').subscribe(values => {
          this.candidatos = values.json() as object[];
      });
  }
  details() {
      this.eligioCandidato = true;
  }
  edit() {

  }
}
