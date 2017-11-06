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
import { SQLite } from "ionic-native/dist/es5";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  database: SQLite;
  storage: Storage;
  user: String = "";
  pass: String = "";
  usuario: number;
  mesa: number = 0;
  fiscal: Fiscal;
  nombreLocalidad: String = "";
  idLocalidad: number = -1;
  numeroMesa: number = -1;

  constructor(public navCtrl: NavController, public http: Http, public alertCtrl: AlertController, storage: Storage, public db: DatabaseProvider, public globalVars: GlobalVariables) {
    this.storage = storage;
    // Send requests from db
    if (this.globalVars.isConnected) {
      this.database = new SQLite();
      this.database.openDatabase({
        name: 'PPS',
        location: 'default'
      }).then(() => {
        storage.get('ip').then((val) => {
          this.globalVars.ip = val;
          storage.get('port').then((val) => {
            this.globalVars.port = val;
            this.globalVars.apiUrl = "http://" + this.globalVars.ip + ":" + this.globalVars.port;
            this.importDb(storage);
          })
        })
        this.database.executeSql("SELECT * FROM requests WHERE done = 0", {}).then((resp) => {
          if (resp.res.rows.length > 0) {
            for (var i = 0; i < resp.res.rows.length; i++) {
              let item = resp.res.rows.item(i);
              this.http.request(item['url'], new Headers({ method: item['type'], body: item['data'] })).subscribe(res => {
                this.database.executeSql("UPDATE requests SET done = 1 WHERE id = ?", item['id']);
              });
            }
          }
        })
      });
      //Chequear si ya hizo login
      storage.get('login').then((val) => {
        console.log(val);
        if (val == true) {
          storage.get('user').then((val) => {
            console.log(val);
            if (val == 0) {
              this.usuario == val;
              storage.get('mesaId').then((val) => {
                if (val == null) {
                  storage.get('localidad').then((val) => { this.nombreLocalidad = val });
                  storage.get('idLocalidad').then((val) => { this.idLocalidad = val });
                } else {
                  storage.get('localidad').then((val) => { this.nombreLocalidad = val });
                  storage.get('mesa').then((val) => { this.numeroMesa = val });
                  storage.get('mesaId').then((val) => { this.mesa = val });
                }
              });
              this.navToMain();
            }
            else if (val == 1 || val == 2) {
              this.usuario == val;
              this.navToMain();
            }
          });
        }
      });
    }
  }

  generar() {
    this.database = new SQLite();
    this.database.openDatabase({
      name: 'PPS',
      location: 'default'
    }).then(() => {
      var index = 0;
      this.crearTablas(index);
    });
  }

  insertar() {
    this.database = new SQLite();
    this.database.openDatabase({
      name: 'PPS',
      location: 'default'
    }).then(() => {
      this.database.executeSql(`INSERT INTO requests (type, url, data, done) VALUES ('post', '/api/candidato', '{tumama: 69}', 0)`, {});
    }).then((res) => {
      console.log("SE INSETO HDP");
      console.log(res);
      this.database.executeSql(`INSERT INTO requests (type, url, data, done) VALUES ('patch', '/api/candidato', '{tumama: 69}', 0)`, {});
    }, (error) => { console.log("HUBO UN ERROR " + error) });
  }

  sendRequests() {
    this.database.executeSql("SELECT * FROM requests WHERE done = 0", {}).then((resp) => {
      console.log(resp);
      if (resp.rows.length > 0) {
        for (var i = 0; i < resp.rows.length; i++) {
          let item = resp.rows.item(i);
          console.log(item);
          this.http.request(item['url'], new Headers({ method: item['type'], body: item['data'] })).subscribe(res => {
            this.database.executeSql("UPDATE requests SET done = 1 WHERE id = ?", item['id']);
          });
        }
      }
    })
  }

  borrarTabla() {
    this.database.openDatabase({
      name: 'PPS',
      location: 'default'
    }).then(() => {
      this.database.executeSql(`DROP TABLE IF EXISTS requests)`, {});
    }).then((res) => {
      console.log("LA PUTA TABLA SE BORRO")
    }, (error) => { console.log("HUBO UN ERROR " + error) });
  }

  crearTablas(index: number) {
    this.database.executeSql(this.globalVars.tables[index], {}).then((res) => {
      index++;
      console.log("LA PUTA TABLA SE CREO");
      console.log(res);
      if (index < this.globalVars.tables.length) {
        this.crearTablas(index);
      }
    }, (error) => { console.log("HUBO UN ERROR " + error) });
  }

  mirarCounts() {
    this.database.executeSql("SELECT COUNT(*) FROM provincias", {}).then((resp) => {
      for (var i = 0; i < resp.rows.length; i++) {
        let item = resp.rows.item(i);
        console.log(item);
      }
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
            this.storage.set('user', role);
            this.storage.set('localidad', this.nombreLocalidad);
            this.storage.set('idLocalidad', this.idLocalidad);
            this.storage.set('login', true);
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
            this.storage.set('user', role);
            this.storage.set('mesa', this.numeroMesa);
            this.storage.set('mesaId', this.mesa);
            this.http.get(this.globalVars.apiUrl +
              '/api/fiscalizacion/getLocMesa?id=' + this.mesa).map(res => res.text()).subscribe(data => {
                this.nombreLocalidad = data;
                console.log('localidadname:' + this.nombreLocalidad);
              });
            this.storage.set('localidad', this.nombreLocalidad);
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
            this.storage.set('login', true);
            alert.present();
          }
        });
    }
    else {
      this.storage.set('user', role);
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
      this.storage.set('login', true);
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

  importDb(storage: Storage) {
    storage.get('db_filled').then((filled) => {
      // Si no se crearon ya antes y hay coneccion
      if (true || (!filled && this.globalVars.isConnected)) {
        this.http.get(this.globalVars.apiUrl +
          '/api/provincia').map(res => res.json()).subscribe(data => {
            for (let provincia of data) {
              this.database.executeSql("INSERT INTO PROVINCIAS VALUES('" + provincia.nombreProvincia + "')", {});
            }
            this.http.get(this.globalVars.apiUrl +
              "/api/localidad").map(res => res.json()).subscribe(data => {
                for (let localidad of data) {
                  this.database.executeSql("INSERT INTO LOCALIDADES VALUES(" + localidad.id + ",'" + localidad.nombreLocalidad + "','" + localidad.provincia.nombreProvincia + "')", {});
                }
                this.http.get(this.globalVars.apiUrl +
                  "/api/partidopolitico").map(res => res.json()).subscribe(data => {
                    for (let partido of data) {
                      this.database.executeSql("INSERT INTO PARTIDOPOLITICOS VALUES (" + partido.numeroLista + ",'" + partido.nombre + "'," + partido.provincia.nombreProvincia + ",'" + partido.color + "')", {});
                    }
                    this.http.get(this.globalVars.apiUrl +
                      "/api/candidato").map(res => res.json()).subscribe(data => {
                        for (let candidato of data) {
                          this.database.executeSql("INSERT INTO CANDIDATOS VALUES(" + candidato.id + "," + candidato.cargo + ",'" + candidato.urlFoto + "','" + candidato.nombre + "','" + candidato.apellido + "','" + candidato.nombreCompleto + "'," + candidato.localidad.id + "," + candidato.partido.numeroLista + "," + candidato.votos + "," + ")", {});
                        }
                        this.http.get(this.globalVars.apiUrl +
                          "/api/mesa").map(res => res.json()).subscribe(data => {
                            for (let mesa of data) {
                              this.database.executeSql("INSERT INTO MESAS VALUES (" + mesa.id + "," + mesa.numero + "," + mesa.circuito + "," + mesa.localidad.id + ")", {});
                            }
                            this.http.get(this.globalVars.apiUrl +
                              "/api/recuento").map(res => res.json()).subscribe(data => {
                                for (let recuento of data) {
                                  this.database.executeSql("INSERT INTO RECUENTOS VALUES (" + recuento.id + "," + recuento.candidato + "," + recuento.votos + "," + recuento.mesa + ")", {});
                                }
                                //this.http.get(this.globalVars.apiUrl +
                                //  "/api/usuario").map(res => res.json()).subscribe(data => {
                                //    for (let user of data) {
                                //      this.storage.executeSql("INSERT INTO USUARIOS VALUES(" + user.id + "," + user.usuario + "," + user.contraseña + "," + user.nombreCompleto + "," + user.rol + ")", {});
                                //    }
                                this.http.get(this.globalVars.apiUrl +
                                  "/api/telegrama").map(res => res.json()).subscribe(data => {
                                    for (let telegrama of data) {
                                      this.database.executeSql("INSERT INTO TELEGRAMAS VALUES(" + telegrama.id + ",'" + telegrama.data + "', " + telegrama.mesa + ")", {});
                                    }
                                    this.http.get(this.globalVars.apiUrl +
                                      "/api/fiscalizacion").map(res => res.json()).subscribe(data => {
                                        for (let fiscal of data) {
                                          this.database.executeSql("INSERT INTO FISCALIZACIONES VALUES(" + fiscal.id + "," + fiscal.user + ", " + fiscal.mesa + ", " + fiscal.localidad + ")", {});
                                        }
                                        // Guardo en el storage que ya me traje todo
                                        storage.set("db_filled", true);
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
                //}, error => {
                //  console.log(error);
                //});
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
