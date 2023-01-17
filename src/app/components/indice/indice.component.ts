import { Component, OnInit } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  position: number;
  tipo: string;
  informacion: string;
  resumen: string;
  fecha: string; 
  detalles?: string;
  children?: any[];
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, tipo: "NOTIFICACIÓN", informacion: "NOTIFICACIÓN POR EXHORTO ORIGINADO EN JUZGADO", resumen: "PROMOCIÓN INICIAL ODP", fecha: "26/06/2014", children: [
    { id: "Folio", text: "1" },
    { id: "Informacion", text: "Presentado por:DENISSE en Fecha:26/06/2014,Resumen:PROMOCIÓN INICIAL ODP" },
    { id: "Estatus", text: "Promoción acordada" },
  ] },
  /* { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  {
    position: 4,
    name: "Beryllium",
    weight: 9.0122,
    symbol: "Be",
    children: [
      { id: "4.1", text: "abc 4.1" },
      { id: "4.2", text: "abc 4.2" },
      { id: "4.3", text: "abc 4.3" },
    ]
  },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" } */
];

@Component({
  selector: 'app-indice',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.css']
})
export class IndiceComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ["position", "tipo", "informacion", "resumen", "fecha"];

  expandedRows: { [key: number]: boolean } = {};

  expand(element: PeriodicElement) {
    this.expandedRows[element.position] = !this.expandedRows[element.position]
  }
  constructor() { }

  ngOnInit(): void {
  }

  

}
