import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { GlobalVariables } from '../../providers/global-variables-provider';


@Component({
  selector: 'page-config',
  templateUrl: 'configpage.html'
})
export class ConfigPage {

    constructor(public navController: NavController, public storage: Storage, public globalVars: GlobalVariables) {
      storage.get('ip').then((val) => {
          this.globalVars.ip = val;
          console.log(val);
      })
      storage.get('port').then((val) => {
          this.globalVars.port = val;
          console.log(val);
      })
  }

  saveConfig() {
      this.storage.set('ip', this.globalVars.ip);
      this.storage.set('port', this.globalVars.port);
      this.globalVars.apiUrl = "http://" + this.globalVars.ip + ":" + this.globalVars.port;
      this.navController.pop();
  }
}
