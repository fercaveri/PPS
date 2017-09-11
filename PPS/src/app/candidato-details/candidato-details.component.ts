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
      this._httpService.get('/api/candidato').subscribe(values => {
          this.candidatos = values.json() as object[];
      });
  }
  details() {
      this.eligioCandidato = true;
  }
  edit() {

  }
  delete() {
      this._httpService.delete('/api/candidato/?id=' + this.candidatoElegido).subscribe(response => {
          console.log(response);
      });
  }
}
