import { Component, OnInit,Input, Inject, ViewChild, ElementRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IndiceComponent } from '../indice/indice.component';
//Services
import { AgendaService } from 'src/app/services/agenda/agenda.service'; 
import { Overlay } from '@angular/cdk/overlay';

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
    private overlay:Overlay,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.detalleAudiencia = this.data;
  }

  cancelar() {
    this.dialogRef.close();
  }
  showIndice(){
      this.agendaService.ConsultarIndiceExpediente({identificador: this.data.identificadorExpediente}).subscribe((resp)=> {
        const scrollStrategy = this.overlay.scrollStrategies.block();
        const dialogRef = this.dialog.open(IndiceComponent, {
          width: '1000px',
          maxHeight: '600px',
          data: resp,
          scrollStrategy
        });
      }, error => {
        console.log(error);
      });
      this.cancelar();
  }
}
