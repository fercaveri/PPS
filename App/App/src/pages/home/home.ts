import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { AlertController, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GlobalVariables } from '../../providers/global-variables-provider';
import { MainPage } from '../main/main';
import { ConfigPage } from '../configpage/configpage';
import { DatabaseProvider } from '../../providers/database-provider';
import { config } from '../../config';
import { Usuario, Fiscal } from '../../model';
import { SQLite } from "ionic-native";

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
    // this.storage.clear();
    // Send requests from db
    if (this.globalVars.isConnected) {
      if (true) {
        console.log("IS CONECTED: " + this.globalVars.isConnected);
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
              this.crearTablas(0);
              this.importDb(storage);
            })
          })
          this.sendRequests();
        });
        //Chequear si ya hizo login
        storage.get('login').then((val) => {
          if (val == true) {
            storage.get('user').then((val) => {
              this.usuario = val;
              console.log(val);
              if (val == 0) {
                storage.get('mesaId').then((val) => {
                  if (val == null) {
                    storage.get('localidad').then((val) => {
                      this.nombreLocalidad = val;
                      storage.get('idLocalidad').then((val) => {
                        this.idLocalidad = val;
                        this.navToMain();
                      });
                    });
                  } else {
                    storage.get('localidad').then((val) => {
                      this.nombreLocalidad = val;
                      storage.get('mesa').then((val) => {
                        this.numeroMesa = val;
                        storage.get('mesaId').then((val) => {
                          this.mesa = val;
                          this.navToMain();
                        });
                      });
                    });
                  }
                });
              }
              else if (val == 1 || val == 2) {
                this.navToMain();
              }
            });
          }
        });
      }
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
      this.database.executeSql(`DELETE FROM requests WHERE done = 0`, {});
    }).then((res) => {
      console.log("BORRE TODO");
      console.log(res);
    }, (error) => { console.log("HUBO UN ERROR " + error) });
  }

  sendRequests() {
    var self = this;
    this.database.executeSql("SELECT * FROM requests WHERE done = 0", {}).then((resp) => {
      setTimeout(function () {
        console.log(resp);
        if (resp.rows.length > 0) {
          for (var i = 0; i < resp.rows.length; i++) {
            let item = resp.rows.item(i);
            console.log(item);
            if (item['type'] == 'post') {
              var headers = new Headers();
              headers.append("Accept", 'application/json');
              headers.append('Content-Type', 'application/json');
              let options = new RequestOptions({ headers: headers });
              self.http.post(item['url'], item['data'], options).subscribe(res => {
                self.database.executeSql("UPDATE requests SET done = 1 WHERE id = ?", [item['id']]);
              });
            }
            else if (item['type'] == 'patch') {
              var headers = new Headers();
              headers.append("Accept", 'application/json');
              headers.append('Content-Type', 'application/json');
              let options = new RequestOptions({ headers: headers });
              self.http.patch(item['url'], item['data'], options).subscribe(res => {
                self.database.executeSql("UPDATE requests SET done = 1 WHERE id = ?", [item['id']]);
              });
            }
          }
        }
      }, 5000)
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
          if (data.mesa == null) {
            this.nombreLocalidad = data.localidad.nombreLocalidad;
            this.idLocalidad = data.localidad.id;
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
                this.storage.set('localidad', this.nombreLocalidad);
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
    console.log(this.globalVars.apiUrl +
      '/api/usuario?usuario=')
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
    storage.get('provincias_cached').then((filled) => {
      if (filled) {
        this.http.get(this.globalVars.apiUrl +
          '/api/provincia').map(res => res.json()).subscribe(data => {
            for (let provincia of data) {
              this.database.executeSql("INSERT INTO PROVINCIAS VALUES('" + provincia.nombreProvincia + "')", {});
            }
            storage.set("provincias_cached", true);
          }, error => {
            console.log(error);
          });
      }
      else {
        console.log("PROVINCIAS CARGADAS");
      }
    })

    storage.get('localidades_cached').then((filled) => {
      if (filled) {
        this.http.get(this.globalVars.apiUrl +
          "/api/localidad").map(res => res.json()).subscribe(data => {
            for (let localidad of data) {
              this.database.executeSql("INSERT INTO LOCALIDADES VALUES(" + localidad.id + ",'" + localidad.nombreLocalidad + "','" + localidad.provincia.nombreProvincia + "')", {});
            }
            storage.set("localidades_cached", true);
          }, error => {
            console.log(error);
          });
      }
      else {
        console.log("LOCALIDADES CARGADAS");
      }
    })

    storage.get('partidos_cached').then((filled) => {
      if (filled) {
        this.http.get(this.globalVars.apiUrl +
          "/api/partidopolitico").map(res => res.json()).subscribe(data => {
            for (let partido of data) {
              this.database.executeSql("INSERT INTO PARTIDOPOLITICOS VALUES (" + partido.numeroLista + ",'" + partido.nombre + "'," + partido.provincia.nombreProvincia + ",'" + partido.color + "')", {});
            }
            storage.set("partidos_cached", true);
          }, error => {
            console.log(error);
          });
      }
      else {
        console.log("PARTIDOS CARGADAS");
      }
    })

    storage.get('candidatos_cached').then((filled) => {
      if (filled) {
        this.http.get(this.globalVars.apiUrl +
          "/api/candidato").map(res => res.json()).subscribe(data => {
            for (let candidato of data) {
              this.database.executeSql("INSERT INTO CANDIDATOS VALUES(" + candidato.id + "," + candidato.cargo + ",'" + candidato.urlFoto + "','" + candidato.nombre + "','" + candidato.apellido + "','" + candidato.nombreCompleto + "'," + candidato.localidad.id + "," + candidato.partido.numeroLista + "," + candidato.votos + "," + ")", {});
            }
            storage.set("candidatos_cached", true);
          }, error => {
            console.log(error);
          });
      }
      else {
        console.log("CANDIDATOS CARGADAS");
      }
    })

    storage.get('mesas_cached').then((filled) => {
      if (filled) {
        this.http.get(this.globalVars.apiUrl +
          "/api/mesa").map(res => res.json()).subscribe(data => {
            for (let mesa of data) {
              this.database.executeSql("INSERT INTO MESAS VALUES (" + mesa.id + "," + mesa.numero + "," + mesa.circuito + "," + mesa.localidad.id + ")", {});
            }
            storage.set("mesas_cached", true);
          }, error => {
            console.log(error);
          });
      }
      else {
        console.log("MESAS CARGADAS");
      }
    })

    storage.get('recuentos_cached').then((filled) => {
      if (filled) {
        this.http.get(this.globalVars.apiUrl +
          "/api/recuento").map(res => res.json()).subscribe(data => {
            for (let recuento of data) {
              this.database.executeSql("INSERT INTO RECUENTOS VALUES (" + recuento.id + "," + recuento.candidato + "," + recuento.votos + "," + recuento.mesa + ")", {});
            }
            storage.set("recuentos_cached", true);
          }, error => {
            console.log(error);
          });
      }
      else {
        console.log("RECUENTOS CARGADAS");
      }
    })

    storage.get('telegramas_cached').then((filled) => {
      if (filled) {
        this.http.get(this.globalVars.apiUrl +
          "/api/telegrama").map(res => res.json()).subscribe(data => {
            for (let telegrama of data) {
              this.database.executeSql("INSERT INTO TELEGRAMAS VALUES(" + telegrama.id + ",'" + telegrama.data + "', " + telegrama.mesa + ")", {});
            }
            storage.set("telegramas_cached", true);
          }, error => {
            console.log(error);
          });
      }
      else {
        console.log("TELEGRAMAS CARGADAS");
      }
    })

    storage.get('fiscalizaciones_cached').then((filled) => {
      if (filled) {
        this.http.get(this.globalVars.apiUrl +
          "/api/fiscalizacion/getall").map(res => res.json()).subscribe(data => {
            for (let fiscal of data) {
              this.database.executeSql("INSERT INTO FISCALIZACIONES VALUES(" + fiscal.id + "," + fiscal.user + ", " + fiscal.mesa + ", " + fiscal.localidad + ")", {});
            }
            storage.set("fiscalizaciones_cached", true);
          }, error => {
            console.log(error);
          });
      }
      else {
        console.log("FISCALIZACIONES CARGADAS");
      }
    })
    //this.http.get(this.globalVars.apiUrl +
    //  "/api/usuario").map(res => res.json()).subscribe(data => {
    //    for (let user of data) {
    //      this.storage.executeSql("INSERT INTO USUARIOS VALUES(" + user.id + "," + user.usuario + "," + user.contraseña + "," + user.nombreCompleto + "," + user.rol + ")", {});
    //    }

    //}, error => {
    //  console.log(error);
    //});
  }
}
