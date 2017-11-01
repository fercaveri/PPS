import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { AlertController, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GlobalVariables } from '../../providers/global-variables-provider';
import { MainPage } from '../main/main';
import { ConfigPage } from '../configpage/configpage'
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
  nombreLocalidad: String = "";
  idLocalidad: number = -1;
  numeroMesa: number = -1;

  constructor(public navCtrl: NavController, public http: Http, public alertCtrl: AlertController, storage: Storage, public globalVars: GlobalVariables) {
      storage.get('ip').then((val) => {
          this.globalVars.ip = val;
          storage.get('port').then((val) => {
              this.globalVars.port = val;
              this.globalVars.apiUrl = "http://" + this.globalVars.ip + ":" + this.globalVars.port;
          })
      })
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
      alert.present();
    } else if (role == 0) {
        this.http.get(this.globalVars.apiUrl +
        '/api/fiscalizacion?usuario=' + this.user + '&pass=' + this.pass).map(res => res.json()).subscribe(data => {
          console.log(data.mesa);
          console.log(data.localidad);
          if (data.mesa == null) {
            this.nombreLocalidad = data.localidad.nombreLocalidad;
            this.idLocalidad = data.localidad.id;
            console.log('nombreLocalidad' + this.nombreLocalidad);
            console.log('id localidad' + data.localidad.id);
            alert = this.alertCtrl.create({
              title: 'Login exitoso',
              subTitle: 'Tiene permisos sobre la localidad: ' + this.nombreLocalidad,
              buttons: [
                {
                  text: 'OK',
                  handler: () => {

                    this.navToMain();
                  }
                }
              ]
            });
            alert.present();
          } else {
            this.numeroMesa = data.mesa.numero;
            this.mesa = data.mesa.id;
            console.log('id mesa'+this.mesa);
            console.log('numeroMesa:' + this.numeroMesa);
            this.http.get(this.apiUrl +
              '/api/fiscalizacion/getLocMesa?id=' + this.mesa).map(res => res.text()).subscribe(data => {
                this.nombreLocalidad = data;
                console.log('localidadname:' + this.nombreLocalidad);
              });
            alert = this.alertCtrl.create({
              title: 'Login exitoso',
              subTitle: 'Tiene asignada la mesa: ' + this.numeroMesa,
              buttons: [
                {
                  text: 'OK',
                  handler: () => {

                    this.navToMain();
                  }
                }
              ]
            });
            alert.present();
          }
        });
    }
    else {
      alert = this.alertCtrl.create({
        title: 'Login exitoso',
        subTitle: 'Al ser administrador usted podra utilizar toda la funcionalidad de la app',
        buttons: [
          {
            text: 'OK',
            handler: () => {

              this.navToMain();
            }
          }
        ]
      });
      alert.present();
    } 
  }
  login() {
      this.http.get(this.globalVars.apiUrl +
          '/api/usuario?usuario=' + this.user + '&pass=' + this.pass).map(res => res.json()).subscribe(data => {
              this.usuario = data;
              console.log(this.usuario);
              this.showAlert(this.usuario);
          }, error => {
              console.log(error);
          });
  }

  navToMain() {
    this.navCtrl.push(MainPage, { mesa: this.numeroMesa, rol: this.usuario, localidad: this.nombreLocalidad, idLocalidad: this.idLocalidad , mesaId: this.mesa });
  }

  navToConfig() {
      this.navCtrl.push(ConfigPage);
  }
}
