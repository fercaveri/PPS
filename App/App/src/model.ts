export class Usuario {
    public user: String;
    public pass: String;
    public fullName: String;
    public role: number;
}

export class Fiscal {
    public user: Usuario;
    public id: number;
    public mesa: number;
    public localidad: number;
}

