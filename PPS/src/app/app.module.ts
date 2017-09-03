import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PartidoComponent } from './partido/partido.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
    declarations: [
        AppComponent,
        PartidoComponent
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
