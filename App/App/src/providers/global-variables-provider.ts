import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVariables {
    public ip: String = "";
    public port: String = "";
    public apiUrl: String = "";
    public isConnected: boolean = true;
}
