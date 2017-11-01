import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { AlertController, NavController, NavParams } from 'ionic-angular';

import { config } from '../../config';
import { Camera } from 'ionic-native';

@Component({
    selector: 'foto-telegrama',
    templateUrl: 'fotoTelegrama.html'
})

export class FotoTelegramaPage {

    base64Image
    mesa: number;
    localidad: String;
    apiUrl: String;
    constructor(public navCtrl: NavController, public http: Http, public alertCtrl: AlertController, public navParams: NavParams) {
        this.mesa = this.navParams.get('mesa');
        console.log('mesa:' + this.mesa);
        this.localidad = this.navParams.get('localidad');
        this.apiUrl = navParams.get('apiUrl');
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
            mesa: this.mesa,
            foto: this.base64Image
        };
        this.http.post(this.apiUrl + '/api/telegrama', c).subscribe(response => {
            console.log(response.status);
        });
    }
}
