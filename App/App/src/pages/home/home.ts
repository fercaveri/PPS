import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { MesasPage } from '../mesas/mesas';

import { TelegramaPage } from '../telegrama/telegrama';
import { config } from "../../config";
import { Usuario } from "../../model";
import { Http } from "@angular/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: String = "";
  pass: String = "";
  usuario: Usuario[] = [];
  constructor(public navCtrl: NavController, public http: Http) {
  }
  
  onLink(url: string) {
      window.open(url);
  }

  login() {
      this.http.get('http://localhost:' + new config().port +
          '/api/usuario/?usuario=' + this.user + '&pass=' + this.pass).map(res => res.json()).subscribe(data => {
              this.usuario = data;
              console.log(this.usuario);
      });
  }

  navToMesas() {
      this.navCtrl.push(MesasPage);
  }

  navToGrilla() {
      this.navCtrl.push(TelegramaPage);
  }
}
