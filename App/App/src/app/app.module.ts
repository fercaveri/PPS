import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GlobalVariables } from '../providers/global-variables-provider';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MesasPage } from '../pages/mesas/mesas';
import { TelegramaPage } from '../pages/telegrama/telegrama';
import { MainPage } from '../pages/main/main';
import { ConfigPage } from '../pages/configpage/configpage';
import { FotoTelegramaPage } from '../pages/fotoTelegrama/fotoTelegrama';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        MesasPage,
        TelegramaPage,
        MainPage,
        FotoTelegramaPage,
        ConfigPage
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
        FotoTelegramaPage,
        ConfigPage
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, Storage, GlobalVariables]
})
export class AppModule { }
