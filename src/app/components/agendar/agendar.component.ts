import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
//import {Articulo} from '../articulo';

interface TipoExpediente {
  value: string;
  viewValue: string;
}

interface Audiencia {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.component.html',
  styleUrls: ['./agendar.component.css']
})
export class AgendarComponent implements OnInit {

  tiposExpedientes: TipoExpediente[] = [
    {value: '0', viewValue: 'FAMILIAR'},
    {value: '1', viewValue: 'CUADERNILLO'},
    {value: '2', viewValue: 'EXHORTO'},
    {value: '3', viewValue: 'REQUISITORIA'},
    {value: '4', viewValue: 'CARTA ROGATORIA'},
    {value: '5', viewValue: 'CARTA SUPLICATORIA'}


  ];

  audiencias: Audiencia[] = [
    {value: '0', viewValue: 'AUDIENCIA PRELIMINAR'},
    {value: '1', viewValue: 'AUDIENCIA DE JUICIO'},
    {value: '2', viewValue: 'AUDIENCIA EN AUXILIO\VARIOS'},
    {value: '3', viewValue: 'AUDIENCIA EN MEDIDA'},
    {value: '4', viewValue: 'AUDIENCIA DE JUICIO (ALLANAMIENTO)'},
    {value: '5', viewValue: 'AUDIENCIA DE JUICIO INCIDENTAL'}
  ]

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  constructor(public dialogRef: MatDialogRef<AgendarComponent>, 
    //@Inject(MAT_DIALOG_DATA) public data: Articulo
    ) { }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close();
  }

  nextStep() {
    this.step++;
  }

}
