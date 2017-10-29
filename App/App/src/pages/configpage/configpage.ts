import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-config',
  templateUrl: 'configpage.html'
})
export class ConfigPage {
  ip: String = "";
  port: String = "";

  constructor(public navController: NavController, public storage: Storage) {
      storage.get('ip').then((val) => {
          this.ip = val;
          console.log(val);
      })
      storage.get('port').then((val) => {
          this.port = val;
          console.log(val);
      })
  }

  saveConfig() {
      this.storage.set('ip', this.ip);
      this.storage.set('port', this.port);
      this.navController.pop();
  }
}
