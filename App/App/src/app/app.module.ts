import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MesasPage } from '../pages/mesas/mesas';

import { TelegramaPage } from '../pages/telegrama/telegrama';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        MesasPage,
        TelegramaPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        MesasPage,
        TelegramaPage
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
