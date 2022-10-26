import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-datos-audiencia',
  templateUrl: './datos-audiencia.component.html',
  styleUrls: ['./datos-audiencia.component.css']
})
export class DatosAudienciaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DatosAudienciaComponent>) { }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close();
  }
}
