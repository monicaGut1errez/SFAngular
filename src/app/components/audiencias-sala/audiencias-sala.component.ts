import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-audiencias-sala',
  templateUrl: './audiencias-sala.component.html',
  styleUrls: ['./audiencias-sala.component.css']
})
export class AudienciasSalaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AudienciasSalaComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public objParams: any) { }


  ngOnInit(): void {

  }

}
