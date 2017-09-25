import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { MesasPage } from '../mesas/mesas';

import { TelegramaPage } from '../telegrama/telegrama';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
  }
  
  onLink(url: string) {
      window.open(url);
  }

  navToMesas() {
      this.navCtrl.push(MesasPage);
  }

  navToGrilla() {
      this.navCtrl.push(TelegramaPage);
  }
}
