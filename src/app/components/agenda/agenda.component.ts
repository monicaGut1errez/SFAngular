import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalendarOptions,  DateSelectArg, EventClickArg, EventApi, Calendar, FullCalendarComponent, CalendarApi, diffDates } from '@fullcalendar/angular';
import { INITIAL_EVENTS,createEventId }  from 'src/app/event-utils';
import esLocale from '@fullcalendar/core/locales/es';
import { ThisReceiver } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { TooltipComponent } from '@angular/material/tooltip';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

//Components 
import { TooltipColoresComponent } from 'src/app/components/tooltip-colores/tooltip-colores.component';
import { AgendarComponent } from 'src/app/components/agendar/agendar.component';
import { DatosAudienciaComponent } from 'src/app/components/datos-audiencia/datos-audiencia.component';
import { ImprimirReporteComponent } from '../imprimir-reporte/imprimir-reporte.component';

//Services 
import { AgendaService } from 'src/app/services/agenda/agenda.service'; 
import { takeUntil } from 'rxjs';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

//Models 
import { TipoSala } from 'src/app/Models/models';
import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Cita } from 'src/app/cita';

var X = "";

interface TipoAgenda {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})

export class AgendaComponent {
  public isButtonVisible = false;
  public cmbTipoAgenda = false;
  public lblInfoGen = false; 

  lblinfo_Expediente1: any;
  salaN: any; 

  sala: any; 

  centroTrabajo: string | null; 
  privilegio: string | null;
  vista: string | null; 
  origen: string | null;
  
  audiencia: string | null; 

  citas : Cita[] = [];

  // references the #calendar in the template
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  detalleAudiencia: any;
  //tiposSalas: any;
  //id : any; 
  //title: any; 
  eventos: any; 
  //TiposSalasArray: TipoSala[];
  /* constructor() { }

  ngOnInit(): void {
  } */

  dataSource = ELEMENT_DATA;

  tooltipComponent = TooltipColoresComponent;

  tiposAgenda: TipoAgenda[] = [
    /* {value: '1', viewValue: 'GENERAL'},
    {value: '2', viewValue: 'CONCILIADOR'} */
    ];

  Events = [];
  calendarOptions: CalendarOptions = {
    locale: esLocale,
    //themeSystem: 'bootstrap5',
    headerToolbar: false,
    /*headerToolbar: {
      //: 'prev,next today',
      left: 'custom1,custom5',
      right: 'custom2,prev,next,custom3,custom4'
    },*/
    /* footerToolbar: {
      right: 'prev,next'
    }, */
    allDaySlot: false,
    slotMinTime: "07:00:00",
    slotMaxTime: "20:00:00",
    slotDuration: "00:15:00",
    slotLabelInterval: "00:15:00",
    slotLabelFormat: [
      {hour:'2-digit',
       minute: '2-digit',
       second: '2-digit'
      }
    ],
    dayHeaderFormat: {
      weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric', omitCommas: true
    },
    initialView: 'resourceTimeGridWeek',
    datesAboveResources: true,
    initialEvents: INITIAL_EVENTS,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventMouseEnter: this.openToolTipInfo.bind(this), 
    //eventRender: function(){},
    //schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    schedulerLicenseKey: '0720429164-fcs-1668012642',
    resources: this.getResources(this),
   events: [this.citas
    //this.getCitas
    /*
      {
        id: '1',
        resourceId: '1',
        start: '2023-01-19 10:00:00',
        end: '2023-01-19 12:00:00',
        backgroundColor: '#E6E321'
        //title: 'Prueba1', 
      }, {
        id: '2',
        resourceId: '2',
        start: '2023-01-05 11:00:00',
        end: '2023-01-05 14:30:00',
        //title: 'Prueba2'
      }, {
        id: '3',
        resourceId: '2',
        start: '2023-01-02 08:30:00',
        end: '2023-01-02 12:00:00',
        //title: 'Prueba3'
      }*/
    ],
    customButtons: {
      custom1: {
        text: 'SALIR',
        click: () => this.openModal()
        },
      custom2: {
        text: 'AGENDAR',
        click: function() {
          
        }
        /*
        click: function() {
          alert('clicked custom button 2!');
        }*/
      },
      custom3: {
        text: 'BUSCAR'
      },
      custom4: {
        text: 'IMPRIMIR'
      },
      custom5: {
        text: 'CÓDIGO COLORES'
      },
    },
    buttonText: {
      prev: 'ATRAS',
      next: 'ADELANTE'
    },
    resourceLabelDidMount: function(arg) {
      if (arg.resource.id == '1') {
        arg.el.style.backgroundColor = 'rgb(205, 149, 117)';
      }
      if (arg.resource.id == '2') {
        arg.el.style.backgroundColor = 'rgb(135, 169, 107)';
      }
    },
    dayMinWidth: 150,
    /* businessHours: {
      daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
      startTime: '07:00',
      endTime: '15:00',
    }, */
    businessHours: {
      startTime: '07:00',
      endTime: '15:00',
    },

    height: 'auto',
  };

  currentEvents: EventApi[] = [];

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  prev(){
    let ct: string = atob(this.centroTrabajo || '{}');
    let centroTrabajo = ct;
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.prev();
    var fechaInicio: Date = calendarApi.getDate();
    var dias = 7;
    fechaInicio.setDate(fechaInicio.getDate() - dias);
    var fechaFin: Date = calendarApi.getDate();
    fechaFin.setDate(fechaFin.getDate() + dias)
    this.getCitas(centroTrabajo, fechaInicio, fechaFin)
    /* console.log(fechaInicio, fechaFin);
     this.agendaService.ConsultarAgendaSecretariosAcuerdos(centroTrabajo,fechaInicio,fechaFin).subscribe(data => {
        console.log(data);
      }) */

  }
  next(){
    let ct: string = atob(this.centroTrabajo || '{}');
    let centroTrabajo = ct;
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.next();
    var fechaInicio: Date = calendarApi.getDate();
    var dias = 7;
    fechaInicio.setDate(fechaInicio.getDate() - dias);
    var fechaFin: Date = calendarApi.getDate();
    fechaFin.setDate(fechaFin.getDate() + dias)
    this.getCitas(centroTrabajo, fechaInicio, fechaFin)
   /*  console.log(fechaInicio, fechaFin);
     this.agendaService.ConsultarAgendaSecretariosAcuerdos(centroTrabajo,fechaInicio,fechaFin).subscribe(data => {
        console.log(data);
      }) */
  }
  gotoDate(date: any){
    let ct: string = atob(this.centroTrabajo || '{}');
    let centroTrabajo = ct;
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate( date.value );
    var fechaInicio: Date = calendarApi.getDate();
    var dias = 7;
    fechaInicio.setDate(fechaInicio.getDate() - dias);
    var fechaFin: Date = calendarApi.getDate();
    fechaFin.setDate(fechaFin.getDate() + dias)
    this.getCitas(centroTrabajo, fechaInicio, fechaFin)
    /* console.log(fechaInicio, fechaFin);
     this.agendaService.ConsultarAgendaSecretariosAcuerdos(centroTrabajo,fechaInicio,fechaFin).subscribe(data => {
        console.log(data);
      }) */
  }
  imprimir(){
    const dialogRef = this.dialog.open(ImprimirReporteComponent, {
      width: '550px',
      //data: {name: this.name, animal: this.animal}
    });  
  }
  agendar(){
    alert('hola!');
    console.log('Click!') 
  }
  openModal(){
  }
  handleClick(event: Event) { 
    console.log('Click!', event) 
  }

  /*constructor(private httpClient: HttpClient) {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      //dateClick: this.onDateClick.bind(this),
      events: this.Events
    };
   }*/

  /*onDateClick(res) {
    alert('Clicked on date : ' + res.dateStr)
  }*/

  /*ngOnInit(){
    setTimeout(() => {
      return this.httpClient.get('http://localhost:8888/event.php')
        .subscribe(res => {
            //this.Events.push(res);
            console.log(this.Events);
        });
    }, 2200);

    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        //dateClick: this.onDateClick.bind(this),
        events: this.Events
      };
    }, 2500);
         
    }  */
    constructor(private route: ActivatedRoute, public agendaService: AgendaService, public dialog: MatDialog) {
      //this.inicializarAgenda();
      //this.loadResource(); 
     }

    openDialog(): void {
      const dialogRef = this.dialog.open(AgendarComponent, {
        width: '550px',
        //data: {name: this.name, animal: this.animal}
      });
    }

    salir(): void{
      let message = "Saliendo";
      window.parent.postMessage(message, "*");
    }

    openToolTipInfo(clickInfo: EventClickArg): void {
      const dialogRef = this.dialog.open(DatosAudienciaComponent, {width: '550px'});
      //alert(clickInfo.event.title)
      clickInfo.event.backgroundColor
      console.log(clickInfo.event.title)
    }

    getResources(sala): any[] {
      return [
        {              
          id: "1",
          title: "1"
        },
        {
          id: "2",
          title: "2"
        } 
      ]; 
    }
    getCitas(centroTrabajo, fechaInicio, fechaFin): void {
      this.agendaService.ConsultarAgendaSecretariosAcuerdos(centroTrabajo,fechaInicio,fechaFin).subscribe(data => this.citas = data
        /* {
        console.log(data);
        data.forEach(d => {
          const str = String(d.idSala);
          data  = ({start: d.fechaInicio, end : d.fechaFinal, backgroundColors: d.color});
          console.log (data);
          return data;
        });
      } */
      );
    }
    ngOnInit() {
      this.centroTrabajo = this.route.snapshot.paramMap.get("centroTrabajo");
      this.privilegio = this.route.snapshot.paramMap.get("privilegio");
      this.vista = this.route.snapshot.paramMap.get("vista");
      this.origen = this.route.snapshot.paramMap.get("origen");
      this.audiencia = ""; 
      this.inicializarAgenda();
    }

    inicializarAgenda(): void {
      //console.log(parent, "Este es parent");
      //console.log(parent.location, "Este es parent")
      let ct: string = atob(this.centroTrabajo || '{}');
      
      //console.log(btoa("102")); // OTQ=
      //console.log(btoa("conciliador")); // Y29uY2lsaWFkb3I=
      //console.log(ct)

      let priv: string = atob(this.privilegio || '{}');
      //console.log(priv);

      let vis: string = atob(this.vista || '{}');
      //console.log(vis);

      let ori: string = atob(this.origen || '{}');
      //console.log(ori);

      let aud: string = (this.audiencia || '{}');
      
      if (priv == "95" || priv == "100" || priv == "101" || priv == "301"){
        this.tiposAgenda = [
          {value: '3', viewValue: 'PERSONAL'},
          {value: '4', viewValue: 'GENERAL'}
          ];
      }else{
        this.tiposAgenda = [
          {value: '1', viewValue: 'GENERAL'},
          {value: '2', viewValue: 'CONCILIADOR'}
          ];
      }
      if (vis == "Informativa" && (priv == "94" || priv == "96" || priv == "98" || priv == "100" || priv == "301" || priv == "95" || priv == "101")){
        //console.log ("Entra aquí");
        this.cmbTipoAgenda = true
      }
      //Mostrar btn aggendar
      if (vis == "Informativa" && priv =="94"){
        this.isButtonVisible = true; 
      }

      window.addEventListener('message', function(e){
        var origin = e.origin;
        var data = e.data;
        
        // P R O D U C C I O N 
        if (origin !== 'https://plataforma.poderjudicial-gto.gob.mx')
        return;
        if (data !== null){
          this.lblInfoGen = true; 
          var informacion = JSON.parse(data);
          var info_Expediente = informacion.Informacion;
          var result = obtenerInfoPendiente(info_Expediente);
          // M O S T R A R  L E Y E N D A  C O N C I L I A D O R 
         /* var aud = informacion.IdentificadorAudiencia;
          var result2 = obtenerCita(aud) */
        }
        // P R O D U C C I O N  
      },false);

      const obtenerInfoPendiente = (info_Expediente) =>{
        this.lblinfo_Expediente1 = info_Expediente; 
        //console.log(this.lblinfo_Expediente1)
      }
      const obtenerCita = (aud) =>{
        
      } 
      //console.log(aud);

      if (vis == "conciliador"){
        console.log("Es conciliador");
        this.lblinfo_Expediente1 = "LA AUDIENCIA INICIA: 10:15 AM"
        //var strCita = this.obtenerCita(aud);
      }
      
      // P R U E B A  R E C U R S O S
      /* this.agendaService.ConsultarTiposSalas(ct).subscribe(data => {
        ct = ct; 
        for (let d of data){
          var idSala = d.idSala;
          var salaNombre = d.salaNombre;
          var result = ObtenerTipoSala(idSala,salaNombre)
        }
      }) */

      const ObtenerTipoSala = (idSala, salaNombre) =>{ 
        //console.log(idSala, salaNombre)
        this.sala = salaNombre; 
        //var recursoNombre = this.getResources(this.sala)
        //console.log(this.sala);
      }

      //console.log(lblinfo_Expediente);

      //console.log(this.lblinfo_Expediente);
      /*const centroTrabajo = "142190401";
      const fechaInicio = "2022-01-01T15:11:34.254Z";
      const fechaFin= "2022-10-24T15:11:34.254Z";*/
      
      //this.agendaService.ConsultarFechasInhabiles(ct);

      /* this.agendaService.ConsultarFechasInhabiles(ct).subscribe(data => {
        console.log(data);
      }) */

      let centroTrabajo = ct; 
      this.agendaService.ConsultarTiposSalas(centroTrabajo).subscribe(data => {
        //console.log(data);
      })

      var fechaInicio: Date = new Date();
      var dias = 7;
      fechaInicio.setDate(fechaInicio.getDate() - dias);
      var fechaFin: Date = new Date();
      fechaFin.setDate(fechaFin.getDate() + dias)

      this.getCitas(centroTrabajo, fechaInicio, fechaFin)

      //console.log(fechaInicio, fechaFin);
      

      /*this.agendaService.ConsultarAgendaAtencionApoyo().subscribe(data => {
        this.eventos = data; 
        console.log(this.eventos);
      });
      
      this.agendaService.ConsultarAgendaAuxiliaresAudiencia().subscribe(data => {
        this.eventos = data; 
        console.log(this.eventos);
      })
      this.agendaService.ConsultarAgendaSecretariosAcuerdos().subscribe(data => {
        this.eventos = data; 
        console.log(this.eventos);
      })
      this.agendaService.ConsultarAgendaJueces().subscribe(data => {
        this.eventos = data; 
        console.log(this.eventos);
      })
      this.agendaService.ConsultarAuxiliaresAudienciaLibres().subscribe(data => {
        this.eventos = data; 
        console.log(this.eventos);
      })
      this.agendaService.ConsultarTiposSalasConciliador().subscribe(data => {
        this.eventos = data; 
        console.log(this.eventos);
      })
      this.agendaService.ConsultarConciliadoresLibres().subscribe(data => {
        this.eventos = data; 
        console.log(this.eventos);
      })
      this.agendaService.ConsultarAgendaConciliadoresSecretario().subscribe(data => {
        this.eventos = data; 
        console.log(this.eventos);
      })
      this.agendaService.ConsultarAgendaConciliadores().subscribe( data => {
        this.eventos = data; 
        console.log(this.eventos);
      })
      this.agendaService.ConsultarDetalleAudienciaSalaJuez().subscribe(data => {
        this.eventos = data; 
        console.log(this.eventos);
      })
      this.agendaService.ConsultarDetalleAudienciaSalaSecretario().subscribe( data => {
        this.eventos = data;
        console.log(this.eventos);
      })
      this.agendaService.ConsultarDetalleAudienciaSalaAuxiliar().subscribe( data => {
        this.eventos = data; 
        console.log(this.eventos);
      })
      this.agendaService.ConsultarDetalleAudienciaSalaAtencionApoyo().subscribe( data => {
        this.eventos = data; 
        console.log(this.eventos);
      })
      this.agendaService.ConsultarIndiceExpediente().subscribe(data => {
        this.eventos = data; 
        console.log(this.eventos);
      })*/
    }
}
