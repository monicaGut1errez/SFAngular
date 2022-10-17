import { Component, OnInit } from '@angular/core';


export interface PeriodicElement {
  name: string;
  color: string;
  //position: number;
  //weight: number;
  //symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'REMATE', color: '#00B0F0'},
  {name: 'AUDIENCIA PRELIMINAR', color: '#E6E321'},
  {name: 'AUDIENCIA DE JUICIO', color: '#0070C0'},
  {name: 'AUDIENCIA EN AUXILIO \ VARIOS', color: '#00B050'},
  {name: 'AUDIENCIA EN MEDIDA', color: '#92D050'},
  {name: 'AUDIENCIA DE JUICIO (ALLANAMIENTO)', color: '#D99593'},
  {name: 'AUDIENCIA DE JUICIO INCIDENTAL', color: '#938953'},
  {name: 'ESCUCHA DE MENORES', color: '#800040'},
  {name: 'FASE DE CONCILIACIÓN', color: '#FF8000'},
  {name: 'AUDIENCIA DE JUICIO(ORAL ESPECIAL)',color: '#D80024'},
];

@Component({
  selector: 'app-tooltip-colores',
  templateUrl: './tooltip-colores.component.html',
  styleUrls: ['./tooltip-colores.component.css']
})
export class TooltipColoresComponent implements OnInit {

  displayedColumns: string[] = ['name'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
