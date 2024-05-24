import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { Documento } from '../../Models/documento';

@Component({
  selector: 'app-indice',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.css']
})
export class IndiceComponent implements OnInit {
  //dataSource = this.data.elementos;

  elementos = this.data.elementos.map(
    (element) => ({
      ...element,
      isExpanded: false
    })
  );

  dataSource = this.elementos;

  //dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ["position", "tipo", "informacion", "fecha"];

  expandedRows: { [key: number]: boolean } = {};

  documentos: Documento[] = [];


  constructor(public dialog: MatDialog,
    public agendaService: AgendaService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }


  expand(element: any) {
    //this.expandedRows[element.position] = !this.expandedRows[element.position];
    this.documentos = [];
    if (!element.isExpanded){

      element.isExpanded = true;

      if (element.documentos == null){
        switch (element.tipoAsunto) {
          case 1: //PROMOCION
            this.obtenerDocumentosPromocion(element.identificadorElementoIndice);
            element.documentos = this.documentos;
            break;
          case 2: //ACUERDO
            //this.obtenerDocumentosAcuerdo(element.identificadorElementoIndice);
            break;
          case 3: //DILIGENCIA
            //this.obtenerDocumentosDiligencia(element.identificadorElementoIndice);
            break;
          case 4: //NOTIFICACION
            //this.obtenerDocumentosNotificacion(element.identificadorElementoIndice);
            break;
          case 5: //AUDIENCIA
            //this.obtenerDocumentosAudiencia(element.identificadorElementoIndice);
            break;
          default:
            break;
        }
      }
    } else{
      element.isExpanded = false;
    }
  }

  obtenerDocumentosPromocion(promoID: number){
    this.agendaService.ObtenerDocumentosPromocion( { "identificadorAsunto": promoID }).subscribe((resp) => {
      this.documentos.push({
        nombre:'Acuse ODP',
        url:resp.acuseODP
      }, {
        nombre: 'Acuse juzgado',
        url: resp.acuseJuzgado
      });

      resp.digitalizacion.map( (element) => {
        this.documentos.push( { 
          nombre: element.split('/')[element.split('/').length - 1],
          url: element
         } )
      } );

    });
  }

  obtenerDocumentosAcuerdo(cuerdoID: number){
    this.agendaService.ObtenerDocumentosPromocion( { "identificadorAsunto": cuerdoID }). subscribe((resp) => {
      this.documentos.push({
        nombre:'Acuse ODP',
        url:resp.acuseODP
      }, {
        nombre: 'Acuse juzgado',
        url: resp.acuseJuzgado
      });

      resp.digitalizacion.map( (element) => {
        this.documentos.push( { 
          nombre: element.split('/')[element.split('/').length - 1],
          url: element
         } )
      } );

    });
  }

  obtenerDocumentosDiligencia(diligenciaID: number){
    this.agendaService.ObtenerDocumentosPromocion( { "identificadorAsunto": diligenciaID }). subscribe((resp) => {
      this.documentos.push({
        nombre:'Acuse ODP',
        url:resp.acuseODP
      }, {
        nombre: 'Acuse juzgado',
        url: resp.acuseJuzgado
      });

      resp.digitalizacion.map( (element) => {
        this.documentos.push( { 
          nombre: element.split('/')[element.split('/').length - 1],
          url: element
         } )
      } );

    });
  }

  obtenerDocumentosNotificacion(notiID: number){
    this.agendaService.ObtenerDocumentosPromocion( { "identificadorAsunto": notiID }). subscribe((resp) => {
      this.documentos.push({
        nombre:'Acuse ODP',
        url:resp.acuseODP
      }, {
        nombre: 'Acuse juzgado',
        url: resp.acuseJuzgado
      });

      resp.digitalizacion.map( (element) => {
        this.documentos.push( { 
          nombre: element.split('/')[element.split('/').length - 1],
          url: element
         } )
      } );

    });
  }

  obtenerDocumentosAudiencia(notiID: number){
    this.agendaService.ObtenerDocumentosPromocion( { "identificadorAsunto": notiID }). subscribe((resp) => {
      this.documentos.push({
        nombre:'Acuse ODP',
        url:resp.acuseODP
      }, {
        nombre: 'Acuse juzgado',
        url: resp.acuseJuzgado
      });

      resp.digitalizacion.map( (element) => {
        this.documentos.push( { 
          nombre: element.split('/')[element.split('/').length - 1],
          url: element
         } )
      } );

    });
  }

  abrirDocumento(url:string){
    window.open(url);
  }
}