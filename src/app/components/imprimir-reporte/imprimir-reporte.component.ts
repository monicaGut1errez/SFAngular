import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormGroup, FormControl} from '@angular/forms';

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
  constructor(public agendaService: AgendaService,  public dialogRef: MatDialogRef<ImprimirReporteComponent>, 
    //@Inject(MAT_DIALOG_DATA) public data: Articulo
    ) { }

  ngOnInit(): void {

  }

  cancelar() {
    this.dialogRef.close();
  }
  search(range: any)
  { 
    //this.agendaService.
    console.log(range.value.startDate, range.value.endDate)
  }


}
