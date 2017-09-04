import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PartidoComponent } from './partido/partido.component';
import { LocalidadComponent } from './partido/Localidad.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CandidatoComponent } from './candidato/candidato.component';

@NgModule({
    declarations: [
        AppComponent,
        PartidoComponent,
        LocalidadComponent,
        CandidatoComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
