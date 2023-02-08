import { Component, OnInit,Input, Inject, ViewChild, ElementRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IndiceComponent } from '../indice/indice.component';
//Services
import { AgendaService } from 'src/app/services/agenda/agenda.service'; 

@Component({
  selector: 'app-datos-audiencia',
  templateUrl: './datos-audiencia.component.html',
  styleUrls: ['./datos-audiencia.component.css']
})
export class DatosAudienciaComponent implements OnInit {
  
  detalleAudiencia: any;

  public infoCita: any;

  @Input('detallesAudiencia') tooltipContent: any;

  constructor(
    public agendaService: AgendaService,
    public dialogRef: MatDialogRef<DatosAudienciaComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.detalleAudiencia = this.data;
  }

  cancelar() {
    this.dialogRef.close();
  }
  showIndice(){
      const dialogRef = this.dialog.open(IndiceComponent, {width: '1000px'});
      this.cancelar();
  }
}
