import { Billete } from "./billete";

export class BilleteEntregado {
    Billete: Billete = new Billete();
    Entregado: Boolean = false;
    RondaEntregado: number = 0;

    AsignarBillete(billete: Billete, entregado: Boolean = true, rondaEntregado: number){
        this.Billete = billete;
        this.Entregado = entregado;
        this.RondaEntregado = rondaEntregado;
    }

}


export class TableBilletes{
    Diez: number = 0;
    Veinte: number = 0;
    Cincuenta: number = 0;
    Cien: number = 0;
}
