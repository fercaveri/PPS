import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { AlertController, NavController } from 'ionic-angular';

import { MainPage } from '../main/main';
import { config } from '../../config';
import { Usuario } from '../../model';
import { Camera } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: String = "";
  pass: String = "";
  usuario: number;

  cameraData: string;
  photoTaken: boolean;
  cameraUrl: string;
  photoSelected: boolean;

  constructor(public navCtrl: NavController, public http: Http, public alertCtrl: AlertController) {
  }

  selectFromGallery() {
      var options = {
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          destinationType: Camera.DestinationType.FILE_URI
      };
      Camera.getPicture(options).then((imageData) => {
          this.cameraUrl = imageData;
          this.photoSelected = true;
          this.photoTaken = false;
      }, (err) => {
          // Handle error
      });
  }

  openCamera() {
      var options = {
          sourceType: Camera.PictureSourceType.CAMERA,
          destinationType: Camera.DestinationType.DATA_URL
      };
      Camera.getPicture(options).then((imageData) => {
          this.cameraData = 'data:image/jpeg;base64,' + imageData;
          this.photoTaken = true;
          this.photoSelected = false;
      }, (err) => {
          // Handle error
      });
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
      }
      else {
          alert = this.alertCtrl.create({
              title: 'Login exitoso',
              subTitle: 'Has logrado iniciar sesion correctamente',
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
      this.navCtrl.push(MainPage);
  }
}
