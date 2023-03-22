import { Component,Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { AgendaComponent } from '../agenda/agenda.component';
import { Pipe, PipeTransform } from '@angular/core';
import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { Auxiliar } from '../../Models/models';
import { CalendarApi } from '@fullcalendar/core';

@Component({
  selector: 'app-agendar-pendientes',
  templateUrl: './agendar-pendientes.component.html',
  styleUrls: ['./agendar-pendientes.component.css']
})

export class AgendarPendientesComponent implements OnInit {
  collection: Auxiliar[] = [];
  selected = 0;
  /* collection = [
    {
      idCredencialBandeja: '',
      idDepa: '',
      nombre: '',
      numeroBandeja: ''
    },
    ]; */
  selectedOption: any;
  constructor(public agenda: AgendaComponent, public agendaService: AgendaService, public dialogRef: MatDialogRef<AgendarPendientesComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: AgendaComponent
    ) { 
      console.log(data)

      this.agendaService.ConsultarAuxiliaresAudienciaLibres(data.ct1, data.inicioCita, data.finCita).subscribe((res: any) => {
        res.forEach((d) => {
          this.collection.push({
            idDepa: d.idDepa,
            idCredencialBandeja: d.idCredencialBandeja,
            nombre: d.nombre,
            numeroBandeja: d.numeroBandeja
          });
          return res;
        });

      }, error => {
        console.log({ error });
      });
      }
    
  ngOnInit(): void {
  }
  cancelar() {
    this.dialogRef.close();
  }
  aceptar(selected) {
    let idAux = selected; 
    let salaid = this.data.sala._resource.id; 
    let sala = +salaid;
    let credCaptura = +this.data.cred1;
    let banderaConciliador = 0

    this.agendaService.Agendar(this.data.ct1, this.data.aud1, this.data.inicioCita, this.data.finCita, sala, idAux, credCaptura).subscribe((res: any) => {
      if (res === "true"){
        banderaConciliador = 1;
        this.dialogRef.close();
        this.agenda.calendarOptions.selectable = false;
        if (this.data.complemento === 1){
        this.agenda.inicializarAgendaConciliador(banderaConciliador)
        }
      }
    }, error => {
      console.log({ error });
    });
  }


}
