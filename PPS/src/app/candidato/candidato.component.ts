import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
@Component({
  selector: 'candidato',
  templateUrl: './candidato.component.html',
  styleUrls: ['./candidato.component.css']
})
export class CandidatoComponent{
  constructor(private _httpService: Http) { }
  submitted: boolean = false;
  cargos = [ 'Concejal', 'Diputado Provincial', 'Diputado Nacional', 'Senador Nacional' ]

  onSubmit() {
      this.submitted = true;
      let body = JSON.stringify({ "nombre": this.nombre, "apellido": this.apellido, "cargo": this.cargo });
      let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      let options = new RequestOptions({ headers: headers });
      this._httpService.post('/api/candidato', body, options).subscribe(response => {
          console.log(response);
      });
  }

  nombre: String = "";
  apellido: String = "";
  cargo: Number = -1;
}
