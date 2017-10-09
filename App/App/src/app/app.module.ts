import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MesasPage } from '../pages/mesas/mesas';
import { TelegramaPage } from '../pages/telegrama/telegrama';
import { MainPage } from '../pages/main/main';
import { FotoTelegramaPage } from '../pages/fotoTelegrama/fotoTelegrama';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        MesasPage,
        TelegramaPage,
        MainPage,
        FotoTelegramaPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        MesasPage,
        TelegramaPage,
        MainPage,
        FotoTelegramaPage
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
