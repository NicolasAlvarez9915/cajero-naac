import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Billete } from 'src/app/dominio/billete';
import { BilleteEntregado, TableBilletes } from 'src/app/dominio/billete-entregado';

@Component({
  selector: 'app-modal-retiro',
  templateUrl: './modal-retiro.component.html',
  styleUrls: ['./modal-retiro.component.scss']
})
export class ModalRetiroComponent {
  BilletesStock: Billete[] = [];
  TableBilletes: TableBilletes[] = [];
  
  cantidadBilletesCienEntregados: number = 0;
  cantidadBilletesCincuentaEntregados: number = 0;
  cantidadBilletesVeinteEntregados: number = 0;
  cantidadBilletesDiezEntregados: number = 0;

  constructor(public dialogRef: MatDialogRef<ModalRetiroComponent>,
    @Inject(MAT_DIALOG_DATA) public valorARetirar: number, private _snackBar: MatSnackBar) {
      
      var BilletesLocalStorage: string | undefined | null = localStorage.getItem('BilletesStocks') == ""  || localStorage.getItem('BilletesStocks') == null ? "[]" : localStorage.getItem('BilletesStocks');
      this.BilletesStock = JSON.parse(BilletesLocalStorage!);
      if(this.BilletesStock.length == 0){
        this._snackBar.open('No hay billetes para entregar', 'Aceptar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.dialogRef.close();
      }
      this.CalcularEntrega();
     }

     CalcularEntrega(){
      debugger
      var acarreo = 0;
      var ronda = 0;
      var billetesAEntregar: BilleteEntregado[] = [];

      var valorAcumulado = 0;

      while (valorAcumulado < this.valorARetirar)
      {
        
        var tableBilletes: TableBilletes = new TableBilletes();
        
        tableBilletes.Cien = 0;
        tableBilletes.Veinte = 0;
        tableBilletes.Cincuenta = 0;
        tableBilletes.Diez = 0;
          for (var i: number = acarreo; i < this.BilletesStock.length; i++)
          {
              if (valorAcumulado < this.valorARetirar)
              {
                  var billeteEntregado: BilleteEntregado  = new BilleteEntregado();
                  billeteEntregado.AsignarBillete(this.BilletesStock[i],false,ronda);

                  if ((valorAcumulado + this.BilletesStock[i].Denominacion) <= this.valorARetirar)
                  {
                      if (this.BilletesStock[i].CantidadStock > 0)
                      {
                          valorAcumulado += this.BilletesStock[i].Denominacion;
                          this.BilletesStock[i].CantidadStock--;
                          billeteEntregado.Entregado = true;

                          switch(this.BilletesStock[i].Denominacion){
                              case 10000:
                                this.cantidadBilletesDiezEntregados++;
                                tableBilletes.Diez = 1;
                              break;
                              case 20000:
                                this.cantidadBilletesVeinteEntregados++;
                                tableBilletes.Veinte = 1;
                              break;
                              case 50000:
                                this.cantidadBilletesCincuentaEntregados++;
                                tableBilletes.Cincuenta = 1;
                              break;
                              case 100000:
                                this.cantidadBilletesCienEntregados++;
                                tableBilletes.Cien = 1;
                              break;
                          }
                      }
                      else
                      {
                        this._snackBar.open('Por el metodo de acarreo incremental no es posible entregar los billetes correspondientes, debido a que no hay disponibilidad suficiente en este momento', 'Aceptar', {
                          duration: 3000,
                          horizontalPosition: 'end',
                          verticalPosition: 'top'
                        });
                        this.dialogRef.close();
                        break;
                      }
                  }
                  billetesAEntregar.push(billeteEntregado);
              }
              else
              {
                  i = this.BilletesStock.length;
              }
          }
          acarreo = acarreo == 3 ? 0 : acarreo+1;
          if(tableBilletes.Cien + tableBilletes.Cincuenta + tableBilletes.Veinte + tableBilletes.Diez != 0){
            this.TableBilletes.push(tableBilletes);
          }
          ronda++;
      }
      localStorage.setItem('BilletesStocks',JSON.stringify(this.BilletesStock));
     }
}
