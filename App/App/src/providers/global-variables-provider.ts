import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVariables {
    public ip: String = "";
    public port: String = "";
    public apiUrl: String = "";
    public isConnected: boolean = true;
    public tables: string[] = [
      "CREATE TABLE IF NOT EXISTS requests (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, type TEXT, url TEXT, data TEXT, done INTEGER)",
      "CREATE TABLE IF NOT EXISTS provincias (nombreProvincia TEXT)",
      "CREATE TABLE IF NOT EXISTS localidades (id INT PRIMARY KEY, nombreLocalidad TEXT, provincia TEXT)",
      "CREATE TABLE IF NOT EXISTS partidopoliticos (numeroLista INT PRIMARY KEY, nombre TEXT, provincia TEXT, color TEXT)",
      "CREATE TABLE IF NOT EXISTS candidatos (id INT PRIMARY KEY, cargo INT, urlFoto TEXT, nombre TEXT, apellido TEXT, nombreCompleto TEXT, localidadid INT, partidoid INT, votos INT)",
      "CREATE TABLE IF NOT EXISTS mesas (id INT PRIMARY KEY, numero INT, circuitoid INT, localidadid INT)",
      "CREATE TABLE IF NOT EXISTS recuentos (id INT PRIMARY KEY, candidatoid INT, votos INT, mesaid INT)",
      "CREATE TABLE IF NOT EXISTS telegramas (id INT PRIMARY KEY, data TEXT, mesaid INT)",
      "CREATE TABLE IF NOT EXISTS fiscalizaciones (id INT PRIMARY KEY, userid INT, mesaid INT, localidadid INT)"];
}
