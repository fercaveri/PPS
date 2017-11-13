import { Component } from '@angular/core';
import { GlobalVariables } from '../../providers/global-variables-provider';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { TelegramaPage } from '../telegrama/telegrama';
import 'rxjs/add/operator/map';
import { config } from "../../config";
import { FotoTelegramaPage } from '../fotoTelegrama/fotoTelegrama';
import { SQLite } from "ionic-native";

@Component({
  selector: 'page-mesas',
  templateUrl: 'mesas.html'
})
export class MesasPage {
  provincias: object[] = [];
  provincia: String = "";
  localidadesProvincia: object[] = [];
  localidad: number = -1;
  mesa: number = 0;
  mesasLocalidades: object[] = [];
  apiUrl: String;
  tienePermisos: boolean = true;
  database: SQLite;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public globalVars: GlobalVariables) {
    console.log('localidadid:' + navParams.get('idLocalidad'));

    console.log('localidad:' + navParams.get('localidad'));
    if (navParams.get('idLocalidad') != -1) {
      this.localidad = navParams.get('localidad');
      this.buscarMesas(this.localidad);
      this.tienePermisos = false;
    }
    else {
      if (this.globalVars.isConnected) {
        this.http.get(this.globalVars.apiUrl + '/api/provincia').map(res => res.json()).subscribe(data => {
          console.log(data);
          this.provincias = data;
        });
      }
      else {
        this.database = new SQLite();
        this.database.openDatabase({
          name: 'PPS',
          location: 'default'
        }).then(() => {
          this.database.executeSql("SELECT * FROM provincias", {}).then((resp) => {
            console.log(resp);
            if (resp.rows.length > 0) {
              for (var i = 0; i < resp.rows.length; i++) {
                let item = resp.rows.item(i);
                console.log(item);
                this.provincias.push(item);
              }
            }
          })
        })
      }
    }
  }

  onChange(provincia: string) {
    this.provincia = provincia;
    //console.log(this.provincia);
    if (this.globalVars.isConnected) {
      this.http.get(this.globalVars.apiUrl + '/api/localidad/' + this.provincia + '/').map(res => res.json()).subscribe(data => {
        this.localidadesProvincia = data;
      });
    }
    else {
      let query = "SELECT * FROM localidades WHERE provincia like ?";
      console.log("provincia: " + provincia);
      this.database.executeSql(query, [provincia]).then((resp) => {
        console.log(resp);
        if (resp.rows.length > 0) {
          for (var i = 0; i < resp.rows.length; i++) {
            let item = resp.rows.item(i);
            this.localidadesProvincia.push(item);
          }
        }
      })
    }
  }
  buscarMesas(localidadid: number) {
    this.localidad = localidadid;
    console.log(this.localidad);
    if (this.globalVars.isConnected) {
      this.http.get(this.globalVars.apiUrl + '/api/mesa/' + this.localidad + '/').map(res => res.json()).subscribe(data => {
        this.mesasLocalidades = data;
      });
    }
    else {
      let query = "SELECT * FROM mesas WHERE localidadid = ?";
      this.database.executeSql(query, [ localidadid ]).then((resp) => {
        console.log(resp);
        if (resp.rows.length > 0) {
          for (var i = 0; i < resp.rows.length; i++) {
            let item = resp.rows.item(i);
            console.log(item);
            this.mesasLocalidades.push(item);
          }
        }
      })
    }
  }
  buscarCandidatos(mesa: number) {
    this.mesa = mesa;
    console.log(mesa);
    console.log(this.mesa);
  }

  nav() {
    this.navCtrl.push(TelegramaPage, { mesa: this.mesa, localidad: this.localidad });
  }
  photo() {
    this.navCtrl.push(FotoTelegramaPage, { mesaId: this.mesa, localidad: this.localidad, apiUrl: this.apiUrl });
  }
}
