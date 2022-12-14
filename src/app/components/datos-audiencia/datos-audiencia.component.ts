import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

//Services
import { AgendaService } from 'src/app/services/agenda/agenda.service'; 

@Component({
  selector: 'app-datos-audiencia',
  templateUrl: './datos-audiencia.component.html',
  styleUrls: ['./datos-audiencia.component.css']
})
export class DatosAudienciaComponent implements OnInit {
  detalleAudiencia: any;

  constructor(public agendaService: AgendaService,public dialogRef: MatDialogRef<DatosAudienciaComponent>) { }

  ngOnInit(): void {
    this.agendaService.ConsultarDetalleAudiencia().subscribe(data => {
      this.detalleAudiencia = data;
      console.log(this.detalleAudiencia);
    });
  }

  cancelar() {
    this.dialogRef.close();
  }
}
