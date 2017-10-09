import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: String;
  pass: String;
  rol: number;
  showAlert: boolean;
  constructor(private _httpService: Http) { }

  ngOnInit() {
  }

  login() {
      this._httpService.get('/api/usuario?usuario=' + this.user + '&pass=' + this.pass).subscribe(values => {
          this.rol = Number(values.text('legacy'));
          console.log(this.rol);
          this.showAlert = true;
      });
  }
}
