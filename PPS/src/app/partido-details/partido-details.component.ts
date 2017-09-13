import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";

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

  ngOnInit() {
      this._httpService.get('/api/partidopolitico').subscribe(values => {
          this.partidos = values.json() as object[];
          console.log(values);
      });
  }

  onSubmit() {
      this._httpService.get('/api/partidopolitico/'+this.partido).subscribe(values => {
          this.candidatos = values.json() as object[];
          console.log(values);
      });
  }

}
