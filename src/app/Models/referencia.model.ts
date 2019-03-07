export interface IReferencia {
    referencia: string;
    color: string;
    talla: number;
    total: number;
    cliente: string;
    factura: string;
    observaciones: string;
    fechaRecibido: Date;
}

export class Referencia implements IReferencia {
    public referencia: string;
    public color: string;
    public talla: number;
    public total: number;
    public cliente: string;
    public factura: string;
    public observaciones: string;
    public fechaRecibido: Date;
}
