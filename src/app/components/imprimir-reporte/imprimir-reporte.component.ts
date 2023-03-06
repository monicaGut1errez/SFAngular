import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormGroup, FormControl} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

//Services
import { AgendaService } from 'src/app/services/agenda/agenda.service';

@Component({
  selector: 'app-imprimir-reporte',
  templateUrl: './imprimir-reporte.component.html',
  styleUrls: ['./imprimir-reporte.component.css']
})
export class ImprimirReporteComponent implements OnInit {

  range = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  })
  constructor(
    public agendaService: AgendaService
    , public dialogRef: MatDialogRef<ImprimirReporteComponent>
    , private spinner: NgxSpinnerService
    , @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

  }

  cancelar() {
    this.dialogRef.close();
  }
  search(range: any)
  { 
    
    let obj = {
        FechaInicial: range.value.startDate,
        FechaFinal: range.value.startDate
    }
    
    this.spinner.show();

    if (this.data.privilegio != 94){
      this.agendaService.ImprimirAgenda(obj).subscribe((data: string) =>{
        this.dialogRef.close();
        this.spinner.hide();
        window.open(data);
      }, error => {
        this.spinner.hide();
        console.log(error);
      });
    } else {
      this.agendaService.ImprimirAgendaSecretarioAcuerdos(obj).subscribe((data: string) =>{
        this.dialogRef.close();
        this.spinner.hide();
        window.open(data);
      }, error => {
        this.spinner.hide();
        console.log(error);
      });
    }
  }


}
