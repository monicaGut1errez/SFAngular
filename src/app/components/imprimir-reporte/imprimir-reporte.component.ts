import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-imprimir-reporte',
  templateUrl: './imprimir-reporte.component.html',
  styleUrls: ['./imprimir-reporte.component.css']
})
export class ImprimirReporteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ImprimirReporteComponent>, 
    //@Inject(MAT_DIALOG_DATA) public data: Articulo
    ) { }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close();
  }


}
