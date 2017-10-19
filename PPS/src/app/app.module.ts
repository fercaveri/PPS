import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PartidoComponent } from './partido/partido.component';
import { LocalidadComponent } from './partido/Localidad.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CandidatoComponent } from './candidato/candidato.component';
import { HttpClientModule } from '@angular/common/http';
import { CandidatoDetailsComponent } from './candidato-details/candidato-details.component';
import { PartidoDetailsComponent } from './partido-details/partido-details.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TelegramaComponent } from './telegrama/telegrama.component';
import { LoginComponent } from './login/login.component';
import { RecuentoComponent } from './recuento/recuento.component';
import { ChartsModule } from 'ng2-charts';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
    declarations: [
        AppComponent,
        PartidoComponent,
        LocalidadComponent,
        CandidatoComponent,
        CandidatoDetailsComponent,
        PartidoDetailsComponent,
        UsuarioComponent,
        SpinnerComponent,
        TelegramaComponent,
        LoginComponent,
        RecuentoComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        ChartsModule,
        ColorPickerModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
