import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import swal from 'sweetalert2';
import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { Mediador } from '../../Models/models';

@Component({
  selector: 'app-agendar-pendientes-sec-conciliador',
  templateUrl: './agendar-pendientes-sec-conciliador.component.html',
  styleUrls: ['./agendar-pendientes-sec-conciliador.component.css']
})
export class AgendarPendientesSecConciliadorComponent implements OnInit {
  @Output() onCitaCreada = new EventEmitter<any>(true);

  collection: Mediador[] = [];
  selected = 0;
  constructor(
    public agendaService: AgendaService
    , public dialogRef: MatDialogRef<AgendarPendientesSecConciliadorComponent>
    , @Inject(MAT_DIALOG_DATA) public data: any
  ) { 

    this.agendaService.ConsultarConciliadoresLibres(data.ct1, data.inicioCita, data.finCita).subscribe((res: any) => {
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
    debugger;
    let salaid = this.data.sala._resource.id; 
    let sala = +salaid;
    let credCaptura = +this.data.cred1;
    let banderaConciliador = 0;
    
    // this.agendaService.Agendar(this.data.ct1, this.data.aud1, this.data.inicioCita, this.data.finCita, sala, idAux, credCaptura).subscribe((res: any) => {
    //   if (res === "true"){
         banderaConciliador = 1;
    //     this.dialogRef.close();
    //     this.agenda.calendarOptions.selectable = false;
    
        if (this.data.complemento === 1){
          //TODO
          //MANDAR ALERTA DE QUE SI DESEA AGENDAR CONCILIADOR
          // true ? inicializarAgendaConciliador : CERRAR y llamar InicializarAgendaNormal
          swal.fire({
            title: 'Se agendó correctamente, ¿Desea agendar conciliador?',
            showDenyButton: true,
            confirmButtonText: 'Agendar',
            denyButtonText: 'Cancelar',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              debugger;
  
              this.onCitaCreada.emit(1);
              this.dialogRef.close();

            } else if (result.isDenied) {
              this.dialogRef.close();
              this.onCitaCreada.emit(0);
            }
          })
        //
    //     }
      } else {
        this.dialogRef.close();
        this.onCitaCreada.emit(0);
      }
    // }, error => {
    //   console.log({ error });
    // });
  }
}
