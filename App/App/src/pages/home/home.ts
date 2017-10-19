import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { AlertController, NavController } from 'ionic-angular';

import { MainPage } from '../main/main';
import { config } from '../../config';
import { Usuario, Fiscal } from '../../model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: String = "";
  pass: String = "";
  usuario: number;
  mesa: number = 0;

  fiscal: Fiscal;
  nombreLocalidad: String;
  numeroMesa: number;

  constructor(public navCtrl: NavController, public http: Http, public alertCtrl: AlertController) {
  }
  
  onLink(url: string) {
      window.open(url);
  }
  showAlert(role: number) {
      let alert;
      if (role == -1) {
          alert = this.alertCtrl.create({
              title: 'Login fallido',
              subTitle: 'La contraseña o el usuario son incorrectos',
              buttons: ['OK']
          });
      } else {

          if (role == 0) {
              this.http.get('http://' + new config().ip + ':' + new config().port +
                  '/api/fiscalizacion?usuario=' + this.user + '&pass=' + this.pass).map(res => res.json()).subscribe(data => {
                      this.fiscal = data;
                      if (this.fiscal.localidad == -1) {
                          console.log("Tiene permiso sobre mesa")
                          this.http.get('http://' + new config().ip + ':' + new config().port +
                              '/api/fiscalizacion/getmesa?id=' + this.fiscal.mesa).map(res => res.json()).subscribe(data => {
                                  this.numeroMesa = data;
                                  console.log(data);
                              });
                      } else {
                          console.log("Tiene permiso sobre localidad o provincia");
                          this.http.get('http://' + new config().ip + ':' + new config().port +
                              '/api/fiscalizacion/getloc?id=' + this.fiscal.localidad).map(res => res.text()).subscribe(data => {
                                  this.nombreLocalidad = data;
                                  console.log(this.nombreLocalidad);
                              });
                      }
                      console.log(data);
                  }, error => {
                      console.log(error);
                  });
          }
          var subtitle;
          if (role == 1 || role == 2) {
              subtitle = 'Al ser administrador usted podra utilizar toda la funcionalidad de la app';
          } else if (this.fiscal.mesa == -1) {
              subtitle = 'Tiene permisos sobre la localidad:' + this.nombreLocalidad;
          } else {
              subtitle = 'Tiene asignada la mesa :' + this.numeroMesa;
          }
          alert = this.alertCtrl.create({
              title: 'Login exitoso',
              subTitle: subtitle,
              buttons: [
                  {
                      text: 'OK',
                      handler: () => {

                          this.navToMain();
                      }
                  }
              ]
          });
      }
      alert.present();
  }
  login() {
      console.log("CALL A http://" + new config().ip + ':' + new config().port +
          '/api/usuario?usuario=' + this.user + '&pass=' + this.pass);
      this.http.get('http://' +new config().ip +':'+ new config().port +
          '/api/usuario?usuario=' + this.user + '&pass=' + this.pass).map(res => res.json()).subscribe(data => {
              this.usuario = data;
              console.log(this.usuario);
              this.showAlert(this.usuario);
          }, error => {
              console.log(error);
          });
  }

  navToMain() {
      this.navCtrl.push(MainPage, {mesa: this.mesa});
  }
}
