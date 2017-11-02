import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { GlobalVariables } from '../../providers/global-variables-provider';
import { DatabaseProvider } from '../../providers/database-provider';
import { config } from '../../config';
import { Camera } from 'ionic-native';

@Component({
    selector: 'foto-telegrama',
    templateUrl: 'fotoTelegrama.html'
})

export class FotoTelegramaPage {

    base64Image: String;
    mesa: number;
    localidad: String;
    apiUrl: String;
    constructor(public navCtrl: NavController, public http: Http, public alertCtrl: AlertController, public navParams: NavParams, public db: DatabaseProvider, public globalVars: GlobalVariables) {
        this.mesa = this.navParams.get('mesaId');
        console.log('mesaId:' + this.mesa);
        this.localidad = this.navParams.get('localidad');
    }

    onLink(url: string) {
        window.open(url);
    }

    selectFromGallery() {
        Camera.getPicture({
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            destinationType: Camera.DestinationType.DATA_URL
        }).then((imageData) => {
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            console.log(err);
        });
    }

    sendPhoto() {
        const c = {
            foto: this.base64Image,
            mesa: this.mesa
        };
        if (this.globalVars.isConnected) {
            this.http.post(this.globalVars.apiUrl + '/api/telegrama', c).subscribe(response => {
                console.log(response.status);
            });
        }
        else {
            this.db.query("INSERT INTO TABLE requests values ('post', '" + this.globalVars.apiUrl + "/api/recuento', '" + JSON.stringify(c), + "', 0);")
                .then(res => {
                    console.log("Result: ", res);
                })
                .catch(err => {
                    console.log("Error: ", err);
                });
        }
    }
}
