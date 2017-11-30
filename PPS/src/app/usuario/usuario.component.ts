import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
import { Mesa , Usuario} from '../model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  user: Usuario = new Usuario();
  role: String;
  roles: String[] = ['Normal', 'Admin', 'SuperAdmin'];
  permiso: String;
  eligioPermiso: boolean;
  provincia: String;
  localidad: String;
  mesa: String;
  provincias: object[];
  localidades: object[];
  mesas: Mesa[];
  users: object[];
  modo: String = '';
  constructor(private _httpService: Http) { }
  ngOnInit() {
  }
  back() {
    this.user.id = -1;
    this.user.nombreCompleto = '';
    this.user.pass = '';
    this.user.usuario = '';
    this.user.rol = -1;
    this.role = '';
    if (this.modo == 'edit') {
      this.modo = 'consulta';
    }
    else {
      this.modo = '';
    }
  }
  submit() {
      console.log(this.role);
      for (var i = 0; i < this.roles.length; i++) {
        if (this.roles[i] = this.role) {
            this.user.rol = i;
          }
      }
      console.log(this.user);
      this._httpService.post('api/usuario', this.user).subscribe(response => {
          let body = JSON.parse(response.text("legacy"));
          console.log(body.statusCode)
      });
      if (this.role == 'Normal') {

          var c;
          if (this.permiso == 'provincia') {
              c = { usuario: this.user, provincia: this.provincia }
          } else if (this.permiso == 'localidad') {
              c = { usuario: this.user, localidad: this.localidad }
          } else {
              c = { usuario: this.user, mesa: this.mesa }
          }
          var request = this.getRequest();
          console.log(c);
          console.log(request);
          this._httpService.post('/api/fiscalizacion/'+request, c).subscribe(response => {
              let body = JSON.parse(response.text("legacy"));
              console.log(body.statusCode);
          });
      }
  }
  getRequest(): String {
      if (this.permiso == 'provincia') {
          return 'xprov';
      } else if (this.permiso == 'localidad') {
          return 'xlocalidad';
      } else {
          return 'xmesa';
      }
  }
  mostrarForm(permiso: String) {
      this.permiso = permiso;
      this.eligioPermiso = true;
      console.log(this.permiso);
      this._httpService.get('/api/provincia').subscribe(values => {
          this.provincias = values.json() as object[];
          console.log(this.provincias);
      });
  }
  loadLocalidad() {
      this._httpService.get('/api/localidad/getbyprov?provincia=' + this.provincia).subscribe(values => {
          this.localidades = values.json() as object[];
          console.log(values);
      });
  }
  loadMesas() {
      this._httpService.get('/api/mesa/' + this.localidad).subscribe(values => {
          this.mesas = values.json() as Mesa[];
          console.log(values);
      });
  }
  consulta() {
    this.modo = 'consulta';
    this._httpService.get('/api/usuario/getAll').subscribe(values => {
      this.users = values.json();
      console.log(values);
    });
  }
  delete(user: number) {
    console.log(user);
    this._httpService.delete('/api/usuario?id=' + user).subscribe(values => {
      let body = JSON.parse(values.text("legacy"));
      console.log(body.statusCode);
      this.consulta();
    });
  }
  edit(user: object) {
    this.modo = 'edit';
    this.user.id = user['id'];
    this.user.usuario = user['usuario'];
    this.user.pass = user['pass'];
    this.user.nombreCompleto = user['nombreCompleto'];
    this.user.rol = user['rol'];
    this.role = this.roles[user['rol']];
  }
  editarUsuario() {
    console.log(this.user);
    this._httpService.patch('/api/usuario', this.user).subscribe(values => {
      let body = JSON.parse(values.text("legacy"));
      console.log(body.statusCode);
      this.back();
      this.consulta();
    });
  }
}
