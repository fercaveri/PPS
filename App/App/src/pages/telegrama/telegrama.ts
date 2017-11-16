import { Component } from '@angular/core';
import { GlobalVariables } from '../../providers/global-variables-provider';
import { DatabaseProvider } from '../../providers/database-provider';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { config } from "../../config";
import { SQLite } from "ionic-native";

@Component({
  selector: 'telegrama',
  templateUrl: 'telegrama.html'
})
export class TelegramaPage {
  partidos: Partido[] = [];
  candidatos: Candidato[] = [];
  candidatosPartido: object[] = [];
  recuento: Recuento[] = [];
  mesa: number = 0;
  localidad: number = -1;
  isEdit: boolean = false;
  apiUrl: String;
  database: SQLite;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public db: DatabaseProvider, public globalVars: GlobalVariables) {
    this.mesa = navParams.get('mesaId');
    this.localidad = navParams.get('localidad');
    console.log(this.localidad);
    this.database = new SQLite();
    this.database.openDatabase({
      name: 'PPS',
      location: 'default'
    }).then(() => {
      this.getPartidos();
      this.getCandidatos();
      this.getRecuento();
    })
  }
  logForm() {
    console.log(this.candidatos)
    for (let cand of this.candidatos) {
      const c = {
        mesa: this.mesa,
        votos: cand.votos,
        candidato: cand.id
      };
      if (this.isEdit) {
        if (this.globalVars.isConnected) {
          this.http.patch(this.globalVars.apiUrl + '/api/recuento', c).subscribe(response => {
            console.log(response.status);
          });
        }
        else {
          this.database = new SQLite();
          this.database.openDatabase({
            name: 'PPS',
            location: 'default'
          }).then(() => {
            this.database.executeSql("INSERT INTO requests (type, url, data, done) values ('patch', '" + this.globalVars.apiUrl + "/api/recuento', '" + JSON.stringify(c) + "', 0);", {})
              .then(res => {
                console.log("Result: ", res);
              })
              .catch(err => {
                console.log("Error: ", err);
              });
          })
        }
      }
      else {
        if (this.globalVars.isConnected) {
          this.http.post(this.globalVars.apiUrl + '/api/recuento', c).subscribe(response => {
            console.log(response.status);
          });
        }
        else {
          this.database = new SQLite();
          this.database.openDatabase({
            name: 'PPS',
            location: 'default'
          }).then(() => {
            this.database.executeSql("INSERT INTO requests (type, url, data, done) values ('post', '" + this.globalVars.apiUrl + "/api/recuento', '" + JSON.stringify(c) + "', 0);", {})
              .then(res => {
                console.log("Result: ", res);
              })
              .catch(err => {
                console.log("Error: ", err);
              });
          })
        }
      }
    }
  }
  getPartidos() {
    if (this.globalVars.isConnected) {
      this.http.get(this.globalVars.apiUrl + '/api/partidopolitico').map(res => res.json()).subscribe(data => {
        this.partidos = data;
        console.log(this.partidos);
      });
    }
    else {
      let query = "SELECT * FROM partidopoliticos;";
      this.database.executeSql(query, {}).then((resp) => {
        console.log(resp);
        if (resp.rows.length > 0) {
          for (var i = 0; i < resp.rows.length; i++) {
            let item = resp.rows.item(i);
            console.log(item);
            this.partidos.push(item);
          }
        }
      })
    }
  }
  getCandidatos() {
    if (this.globalVars.isConnected) {
      this.http.get(this.globalVars.apiUrl + '/api/candidato/' + this.localidad + '/').map(res => res.json()).subscribe(data => {
        this.candidatos = data;
        console.log(this.candidatos);
      });
    }
    else {
      let query = "SELECT * FROM candidatos WHERE localidadid = ?";
      let localidadid = this.localidad;
      this.database.executeSql(query, [ localidadid ]).then((resp) => {
        console.log(resp);
        if (resp.rows.length > 0) {
          for (var i = 0; i < resp.rows.length; i++) {
            let item = resp.rows.item(i);
            console.log(item);
            this.candidatos.push(item);
          }
        }
      })
    }
  }
  getRecuento() {
    if (this.globalVars.isConnected) {
      this.http.get(this.globalVars.apiUrl + '/api/recuento?idMesa=' + this.mesa).map(res => res.json()).subscribe(data => {
        this.recuento = data;
        console.log(this.recuento);
        if (this.recuento.length > 0) {
          console.log(this.candidatos);
          this.isEdit = true;
          for (var i = 0; i < this.candidatos.length; i++) {
            for (var j = 0; j < this.recuento.length; j++) {
              if (this.candidatos[i].id == this.recuento[j].candidato.id) {
                this.candidatos[i].votos = this.recuento[j].votos;
              }
            }
          }
          console.log(this.candidatos);
        }
      });
    }
    else {
      let query = "SELECT * FROM recuentos WHERE mesaid = ?";
      let mesaid = this.mesa;
      this.database.executeSql(query, [mesaid]).then((resp) => {
        console.log(resp);
        if (resp.rows.length > 0) {
          for (var i = 0; i < resp.rows.length; i++) {
            let item = resp.rows.item(i);
            for (var j = 0; j < this.candidatos.length; j++) {
              if (this.candidatos[j].id == item.candidato.id) {
                this.candidatos[j].votos = item.votos;
              }
            }
          }
          console.log(this.candidatos);
        }
      })
    }
  }
}

class Partido {
  numeroLista: number;
  nombre: String;
  provincia: String;
}
class Candidato {
  apellido: String;
  cargo: number;
  id: number;
  localidad: object;
  nombre: String;
  nombreCompleto: String;
  partido: Partido;
  urlFoto: String;
  votos: number;
}
class Recuento {
  candidato: Candidato;
  id: number;
  mesa: object;
  votos: number;
}
