import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { AlertController, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GlobalVariables } from '../../providers/global-variables-provider';
import { MainPage } from '../main/main';
import { ConfigPage } from '../configpage/configpage';
import { DatabaseProvider } from '../../providers/database-provider';
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

  constructor(public navCtrl: NavController, public http: Http, public alertCtrl: AlertController, storage: Storage, public db: DatabaseProvider, public globalVars: GlobalVariables) {
    storage.get('ip').then((val) => {
      this.globalVars.ip = val;
      storage.get('port').then((val) => {
        this.globalVars.port = val;
        this.globalVars.apiUrl = "http://" + this.globalVars.ip + ":" + this.globalVars.port;
      })
    })

    // Send requests from db
    if (this.globalVars.isConnected) {
      this.db.query("SELECT * FROM requests WHERE done = 0")
        .then(res => {
          console.log("Result: ", res);
          for (var i = 0; i < res.length; i++) {
            this.http.request(res[i]['url'], new Headers({ method: res[i]['type'], body: res[i]['data'] })).subscribe(res => {
              this.db.query("UPDATE requests SET done = 1 WHERE id = ?", res[i]['id']);
            });
          }
        })
        .catch(err => {
          console.log("Error: ", err);
        });
      this.importDb(this.db, storage);
    }
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
            console.log('id mesa' + this.mesa);
            console.log('numeroMesa:' + this.numeroMesa);
            this.http.get(this.globalVars.apiUrl +
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
    this.navCtrl.push(MainPage, { mesa: this.numeroMesa, rol: this.usuario, localidad: this.nombreLocalidad, idLocalidad: this.idLocalidad, mesaId: this.mesa });
  }

  navToConfig() {
    this.navCtrl.push(ConfigPage);
  }

  importDb(db: DatabaseProvider, storage: Storage) {
    storage.get('db_filled').then((filled) => {
      // Si no se crearon ya antes y hay coneccion
      if (!filled && this.globalVars.isConnected) {
        this.http.get(this.globalVars.apiUrl +
          '/api/provincia').map(res => res.json()).subscribe(data => {
            for (let provincia of data) {
              db.query('INSERT INTO PROVINCIA VALUES(' + provincia.nombreProvincia + ')');
            }
            this.http.get(this.globalVars.apiUrl +
              '/api/localidad').map(res => res.json()).subscribe(data => {
                for (let localidad of data) {
                  db.query('INSERT INTO LOCALIDAD VALUES(' + localidad.id + ',' + localidad.nombreLocalidad + ',' + localidad.provincia + ')');
                }
                this.http.get(this.globalVars.apiUrl +
                  '/api/partidopolitico').map(res => res.json()).subscribe(data => {
                    for (let partido of data) {
                      db.query('INSERT INTO PARTIDOPOLITICO VALUES (' + partido.numeroLista + ',' + partido.nombre + ',' + partido.provincia + ',' + partido.color + ')');
                    }
                    this.http.get(this.globalVars.apiUrl +
                      '/api/candidato').map(res => res.json()).subscribe(data => {
                        for (let candidato of data) {
                          db.query('INSERT INTO CANDIDATO VALUES(' + candidato.id + ',' + candidato.cargo + ',' + candidato.urlFoto + ',' + candidato.nombre + ',' + candidato.apellido + ',' + candidato.nombreCompleto + ',' + candidato.localidad + ',' + candidato.partido + ',' + candidato.votos + ',' + ')');
                        }
                        this.http.get(this.globalVars.apiUrl +
                          '/api/mesa').map(res => res.json()).subscribe(data => {
                            for (let mesa of data) {
                              db.query('INSERT INTO MESA VALUES (' + mesa.id + ',' + mesa.numero + ',' + mesa.circuito + ',' + mesa.localidad + ')');
                            }
                            this.http.get(this.globalVars.apiUrl +
                              '/api/recuento').map(res => res.json()).subscribe(data => {
                                for (let recuento of data) {
                                  db.query('INSERT INTO RECUENTO VALUES (' + recuento.id + ',' + recuento.candidato + ',' + recuento.votos + ',' + recuento.mesa + ')');
                                }
                                this.http.get(this.globalVars.apiUrl +
                                  '/api/usuario').map(res => res.json()).subscribe(data => {
                                    for (let user of data) {
                                      db.query('INSERT INTO USUARIO VALUES(' + user.id + ',' + user.usuario + ',' + user.contraseña + ',' + user.nombreCompleto + ',' + user.rol + ')');
                                    }
                                    this.http.get(this.globalVars.apiUrl +
                                      '/api/telegrama').map(res => res.json()).subscribe(data => {
                                        for (let telegrama of data) {
                                          db.query('INSERT INTO TELEGRAMA VALUES(' + telegrama.id + ',' + telegrama.data + ',' + telegrama.mesa + ')');
                                        }
                                        this.http.get(this.globalVars.apiUrl +
                                          '/api/fiscalizacion').map(res => res.json()).subscribe(data => {
                                            for (let fiscal of data) {
                                              db.query('INSERT INTO FISCALIZACION VALUES(' + fiscal.id + ',' + fiscal.user + ',' + fiscal.mesa + ',' + fiscal.localidad + ',' + ')');
                                            }
                                            // Guardo en el storage que ya me traje todo
                                            storage.set('db_filled', true);
                                          }, error => {
                                            console.log(error);
                                          });
                                      }, error => {
                                        console.log(error);
                                      });
                                  }, error => {
                                    console.log(error);
                                  });
                              }, error => {
                                console.log(error);
                              });
                          }, error => {
                            console.log(error);
                          });
                      }, error => {
                        console.log(error);
                      });
                  }, error => {
                    console.log(error);
                  });
              }, error => {
                console.log(error);
              });
          }, error => {
            console.log(error);
          });
      }
    })
  }
}
