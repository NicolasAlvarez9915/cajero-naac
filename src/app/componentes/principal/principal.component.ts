import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Billete } from 'src/app/dominio/billete';
import { ModalRetiroComponent } from 'src/app/modales/modal-retiro/modal-retiro.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent {
  title = 'Cajero Automatico -- Naac --';
  Billetes: Billete[] = [];
  total: number = 0;
  abactecer10: number = 0;
  abactecer20: number = 0;
  abactecer50: number = 0;
  abactecer100: number = 0;

  tapSeleccionado = "Retirar";
  valorSeleccionado = 0;
  color: string = "";



  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar){
    if(localStorage.getItem('BilletesStocks') == ""  || localStorage.getItem('BilletesStocks') == null){
      this.InicilizarBilletesLocalStorage();
    }
    var BilletesLocalStorage: string | undefined | null = localStorage.getItem('BilletesStocks') == ""  || localStorage.getItem('BilletesStocks') == null ? "[]" : localStorage.getItem('BilletesStocks');
    this.Billetes = JSON.parse(BilletesLocalStorage!);
  }

  InicilizarBilletesLocalStorage(){
    var BilletesIniciales: Billete[] = [new Billete (10000, 6), new Billete (20000, 12), new Billete (50000, 11), new Billete (100000, 10)];
    localStorage.setItem('BilletesStocks', JSON.stringify(BilletesIniciales));
  }
  AbrirModalRetiro(){
    var division = this.valorSeleccionado % 10000 == 0;
    if(this.valorSeleccionado == 0){
      this._snackBar.open('Debe ingresar un valor', 'Aceptar', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
    }else if (this.valorSeleccionado % 10000 != 0){
      this._snackBar.open('Debe ingresar un valor divisible entre 10000', 'Aceptar', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
    }else{
      this.dialog.open(ModalRetiroComponent, {
        data: this.valorSeleccionado
      });
    }
  }

  abastecer(Denominacion: number){
    var BilletesLocalStorage: string | undefined | null = localStorage.getItem('BilletesStocks') == ""  || localStorage.getItem('BilletesStocks') == null ? "[]" : localStorage.getItem('BilletesStocks');
    var Billetes: Billete[] = JSON.parse(BilletesLocalStorage!);

    Billetes.forEach(element => {
      if(element.Denominacion == Denominacion){
        element.CantidadStock += Denominacion == 10000 ? this.abactecer10 : Denominacion == 20000 ? this.abactecer20 : Denominacion == 50000 ? this.abactecer50 : this.abactecer100;
      }
    });
    localStorage.setItem('BilletesStocks',JSON.stringify(Billetes));
    this._snackBar.open('dinero registrado','Aceptar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
  informe(){
    this.total = 0;
    this.tapSeleccionado = 'Informe'
    var BilletesLocalStorage: string | undefined | null = localStorage.getItem('BilletesStocks') == ""  || localStorage.getItem('BilletesStocks') == null ? "[]" : localStorage.getItem('BilletesStocks');
    this.Billetes = JSON.parse(BilletesLocalStorage!);
    this.Billetes.forEach(element => {
      this.total += element.CantidadStock * element.Denominacion;
    });
  }
}
