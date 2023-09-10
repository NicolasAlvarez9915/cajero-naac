export class Billete {
    Denominacion: number = 0;
    CantidadStock: number = 0;

    constructor(denominacion: number = 0, cantidadStock: number = 0){
        this.Denominacion = denominacion;
        this.CantidadStock = cantidadStock;
    }
    CalcularTotal(): number
    {
        return this.Denominacion * this.CantidadStock;
    }
    AumentarStock(cantidadBilletes: number)
    {
        this.CantidadStock += cantidadBilletes;
    }
    RetirarBilletes(cantidadBilletes: number)
    {
        this.CantidadStock-= cantidadBilletes;
    }
}
