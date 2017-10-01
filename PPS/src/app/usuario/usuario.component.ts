import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'

export class Usuario {
    user: String;
    pass: String;
    fullName: String;
    role: number;
}

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  user: Usuario = new Usuario();
  role: String;
  roles: String[] = ['Normal', 'Admin', 'SuperAdmin'];
  constructor(private _httpService: Http) { }
  ngOnInit() {
  }
  submit() {
      for (var i = 0; i < this.roles.length; i++) {
          if (this.roles[i] = this.role) {
              this.user.role = i;
          }
      }
      this._httpService.post('api/usuario', this.user).subscribe(response => {
          let body = JSON.parse(response.text("legacy"));
          console.log(body.statusCode)
      });
  }

}
