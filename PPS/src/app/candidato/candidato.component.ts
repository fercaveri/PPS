import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'candidato',
  templateUrl: './candidato.component.html',
  styleUrls: ['./candidato.component.css']
})
export class CandidatoComponent{

  constructor() { }
  submitted: boolean = false;
  cargos= [ 'Concejal', 'DiputadoProvincial', 'DiputadoNacional', 'SenadorNacional' ]

  onSubmit() {
      this.submitted = true;
  }

}
