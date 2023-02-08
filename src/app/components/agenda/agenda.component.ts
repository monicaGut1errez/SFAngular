import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
  Calendar,
  FullCalendarComponent,
  CalendarApi,
  diffDates,
} from '@fullcalendar/angular';
import { INITIAL_EVENTS, createEventId } from '../../event-utils';
import esLocale from '@fullcalendar/core/locales/es';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

//Components
//import { TooltipColoresComponent } from 'src/app/components/tooltip-colores/tooltip-colores.component';
import { TooltipColoresComponent } from '../tooltip-colores/tooltip-colores.component';
import { AgendarComponent } from '../agendar/agendar.component';
import { DatosAudienciaComponent } from '../datos-audiencia/datos-audiencia.component';
import { ImprimirReporteComponent } from '../imprimir-reporte/imprimir-reporte.component';

//Services
import { AgendaService } from '../../services/agenda/agenda.service';
//Models
import { Recurso } from '../../Models/models';
import { Cita } from '../../cita';

var X = '';

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
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
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

  citas: Cita[] = [];
  citasAgenda: any[] = [];

  recuros: Recurso[] = [];
  colores: any [] = [
    {
      hex: '#CD9575',
      name: 'Antique Brass',
      rgb: '(205, 149, 117)',
    },
    {
      hex: '#87A96B',
      name: 'Asparagus',
      rgb: '(135, 169, 107)',
    },
    {
      hex: '#FFA474',
      name: 'Atomic Tangerine',
      rgb: '(255, 164, 116)',
    },
    {
      hex: '#9F8170',
      name: 'Beaver',
      rgb: '(159, 129, 112)',
    },
    {
      hex: '#FD7C6E',
      name: 'Bittersweet',
      rgb: '(253, 124, 110)',
    },
    {
      hex: '#A2A2D0',
      name: 'Blue Bell',
      rgb: '(162, 162, 208)',
    },
    {
      hex: '#6699CC',
      name: 'Blue Gray',
      rgb: '(102, 153, 204)',
    },
    {
      hex: '#0D98BA',
      name: 'Blue Green',
      rgb: '(13, 152, 186)',
    },
    {
      hex: '#DE5D83',
      name: 'Blush',
      rgb: '(222, 93, 131)',
    },
    {
      hex: '#FF7F49',
      name: 'Burnt Orange',
      rgb: '(255, 127, 73)',
    },
    {
      hex: '#EA7E5D',
      name: 'Burnt Sienna',
      rgb: '(234, 126, 93)',
    },
    {
      hex: '#B0B7C6',
      name: 'Cadet Blue',
      rgb: '(176, 183, 198)',
    },
    {
      hex: '#CB8DEB',
      name: 'Canary Pink',
      rgb: '(255, 255, 153)',
    },
    {
      hex: '#1CD3A2',
      name: 'Caribbean Green',
      rgb: '(28, 211, 162)',
    },
    {
      hex: '#FFAACC',
      name: 'Carnation Pink',
      rgb: '(255, 170, 204)',
    },
    {
      hex: '#DD4492',
      name: 'Cerise',
      rgb: '(221, 68, 146)',
    },
    {
      hex: '#1DACD6',
      name: 'Cerulean',
      rgb: '(29, 172, 214)',
    },
    {
      hex: '#BC5D58',
      name: 'Chestnut',
      rgb: '(188, 93, 88)',
    },
    {
      hex: '#DD9475',
      name: 'Copper',
      rgb: '(221, 148, 117)',
    },
    {
      hex: '#9ACEEB',
      name: 'Cornflower',
      rgb: '(154, 206, 235)',
    },
    {
      hex: '#FFBCD9',
      name: 'Cotton Candy',
      rgb: '(255, 188, 217)',
    },
    {
      hex: '#FDDB6D',
      name: 'Dandelion',
      rgb: '(253, 219, 109)',
    },
    {
      hex: '#2B6CC4',
      name: 'Denim',
      rgb: '(43, 108, 196)',
    },
    {
      hex: '#EFCDB8',
      name: 'Desert Sand',
      rgb: '(239, 205, 184)',
    },
    {
      hex: '#6E5160',
      name: 'Eggplant',
      rgb: '(110, 81, 96)',
    },
    {
      hex: '#CEFF1D',
      name: 'Electric Lime',
      rgb: '(206, 255, 29)',
    },
    {
      hex: '#71BC78',
      name: 'Fern',
      rgb: '(113, 188, 120)',
    },
    {
      hex: '#6DAE81',
      name: 'Forest Green',
      rgb: '(109, 174, 129)',
    },
    {
      hex: '#C364C5',
      name: 'Fuchsia',
      rgb: '(195, 100, 197)',
    },
    {
      hex: '#CC6666',
      name: 'Fuzzy Wuzzy',
      rgb: '(204, 102, 102)',
    },
    {
      hex: '#E7C697',
      name: 'Gold',
      rgb: '(231, 198, 151)',
    },
    {
      hex: '#FCD975',
      name: 'Goldenrod',
      rgb: '(252, 217, 117)',
    },
    {
      hex: '#A8E4A0',
      name: 'Granny Smith Apple',
      rgb: '(168, 228, 160)',
    },
    {
      hex: '#95918C',
      name: 'Gray',
      rgb: '(149, 145, 140)',
    },
    {
      hex: '#1CAC78',
      name: 'Green',
      rgb: '(28, 172, 120)',
    },
    {
      hex: '#1164B4',
      name: 'Green Blue',
      rgb: '(17, 100, 180)',
    },
    {
      hex: '#F0E891',
      name: 'Green Yellow',
      rgb: '(240, 232, 145)',
    },
    {
      hex: '#FF1DCE',
      name: 'Hot Magenta',
      rgb: '(255, 29, 206)',
    },
    {
      hex: '#B2EC5D',
      name: 'Inchworm',
      rgb: '(178, 236, 93)',
    },
    {
      hex: '#5D76CB',
      name: 'Indigo',
      rgb: '(93, 118, 203)',
    },
    {
      hex: '#CA3767',
      name: 'Jazzberry Jam',
      rgb: '(202, 55, 103)',
    },
    {
      hex: '#3BB08F',
      name: 'Jungle Green',
      rgb: '(59, 176, 143)',
    },
    {
      hex: '#FEFE22',
      name: 'Laser Lemon',
      rgb: '(254, 254, 34)',
    },
    {
      hex: '#FCB4D5',
      name: 'Lavender',
      rgb: '(252, 180, 213)',
    },
    {
      hex: '#FFF44F',
      name: 'Lemon Yellow',
      rgb: '(255, 244, 79)',
    },
    {
      hex: '#FFBD88',
      name: 'Macaroni and Cheese',
      rgb: '(255, 189, 136)',
    },
    {
      hex: '#F664AF',
      name: 'Magenta',
      rgb: '(246, 100, 175)',
    },
    {
      hex: '#AAF0D1',
      name: 'Magic Mint',
      rgb: '(170, 240, 209)',
    },
    {
      hex: '#CD4A4C',
      name: 'Mahogany',
      rgb: '(205, 74, 76)',
    },
    {
      hex: '#EDD19C',
      name: 'Maize',
      rgb: '(237, 209, 156)',
    },
    {
      hex: '#979AAA',
      name: 'Manatee',
      rgb: '(151, 154, 170)',
    },
    {
      hex: '#FF8243',
      name: 'Mango Tango',
      rgb: '(255, 130, 67)',
    },
    {
      hex: '#C8385A',
      name: 'Maroon',
      rgb: '(200, 56, 90)',
    },
    {
      hex: '#EF98AA',
      name: 'Mauvelous',
      rgb: '(239, 152, 170)',
    },
    {
      hex: '#FDBCB4',
      name: 'Melon',
      rgb: '(253, 188, 180)',
    },
    {
      hex: '#1A4876',
      name: 'Midnight Blue',
      rgb: '(26, 72, 118)',
    },
    {
      hex: '#30BA8F',
      name: 'Mountain Meadow',
      rgb: '(48, 186, 143)',
    },
    {
      hex: '#C54B8C',
      name: 'Mulberry',
      rgb: '(197, 75, 140)',
    },
    {
      hex: '#1974D2',
      name: 'Navy Blue',
      rgb: '(25, 116, 210)',
    },
    {
      hex: '#FFA343',
      name: 'Neon Carrot',
      rgb: '(255, 163, 67)',
    },
    {
      hex: '#BAB86C',
      name: 'Olive Green',
      rgb: '(186, 184, 108)',
    },
    {
      hex: '#FF7538',
      name: 'Orange',
      rgb: '(255, 117, 56)',
    },
    {
      hex: '#FF2B2B',
      name: 'Orange Red',
      rgb: '(255, 43, 43)',
    },
    {
      hex: '#F8D568',
      name: 'Orange Yellow',
      rgb: '(248, 213, 104)',
    },
    {
      hex: '#E6A8D7',
      name: 'Orchid',
      rgb: '(230, 168, 215)',
    },
    {
      hex: '#414A4C',
      name: 'Outer Space',
      rgb: '(65, 74, 76)',
    },
    {
      hex: '#FF6E4A',
      name: 'Outrageous Orange',
      rgb: '(255, 110, 74)',
    },
    {
      hex: '#1CA9C9',
      name: 'Pacific Blue',
      rgb: '(28, 169, 201)',
    },
    {
      hex: '#FFCFAB',
      name: 'Peach',
      rgb: '(255, 207, 171)',
    },
    {
      hex: '#C5D0E6',
      name: 'Periwinkle',
      rgb: '(197, 208, 230)',
    },
    {
      hex: '#FDDDE6',
      name: 'Piggy Pink',
      rgb: '(253, 221, 230)',
    },
    {
      hex: '#158078',
      name: 'Pine Green',
      rgb: '(21, 128, 120)',
    },
    {
      hex: '#FC74FD',
      name: 'Pink Flamingo',
      rgb: '(252, 116, 253)',
    },
    {
      hex: '#F78FA7',
      name: 'Pink Sherbet',
      rgb: '(247, 143, 167)',
    },
    {
      hex: '#8E4585',
      name: 'Plum',
      rgb: '(142, 69, 133)',
    },
    {
      hex: '#7442C8',
      name: 'Purple Heart',
      rgb: '(116, 66, 200)',
    },
    {
      hex: '#9D81BA',
      name: "Purple Mountain's Majesty",
      rgb: '(157, 129, 186)',
    },
    {
      hex: '#FE4EDA',
      name: 'Purple Pizzazz',
      rgb: '(254, 78, 218)',
    },
    {
      hex: '#FF496C',
      name: 'Radical Red',
      rgb: '(255, 73, 108)',
    },
    {
      hex: '#D68A59',
      name: 'Raw Sienna',
      rgb: '(214, 138, 89)',
    },
    {
      hex: '#714B23',
      name: 'Raw Umber',
      rgb: '(113, 75, 35)',
    },
    {
      hex: '#FF48D0',
      name: 'Razzle Dazzle Rose',
      rgb: '(255, 72, 208)',
    },
    {
      hex: '#E3256B',
      name: 'Razzmatazz',
      rgb: '(227, 37, 107)',
    },
    {
      hex: '#EE204D',
      name: 'Red',
      rgb: '(238,32 ,77 )',
    },
    {
      hex: '#FF5349',
      name: 'Red Orange',
      rgb: '(255, 83, 73)',
    },
    {
      hex: '#C0448F',
      name: 'Red Violet',
      rgb: '(192, 68, 143)',
    },
    {
      hex: '#1FCECB',
      name: "Robin's Egg Blue",
      rgb: '(31, 206, 203)',
    },
    {
      hex: '#7851A9',
      name: 'Royal Purple',
      rgb: '(120, 81, 169)',
    },
    {
      hex: '#FF9BAA',
      name: 'Salmon',
      rgb: '(255, 155, 170)',
    },
    {
      hex: '#FC2847',
      name: 'Scarlet',
      rgb: '(252, 40, 71)',
    },
    {
      hex: '#76FF7A',
      name: "Screamin' Green",
      rgb: '(118, 255, 122)',
    },
    {
      hex: '#9FE2BF',
      name: 'Sea Green',
      rgb: '(159, 226, 191)',
    },
    {
      hex: '#A5694F',
      name: 'Sepia',
      rgb: '(165, 105, 79)',
    },
    {
      hex: '#8A795D',
      name: 'Shadow',
      rgb: '(138, 121, 93)',
    },
    {
      hex: '#45CEA2',
      name: 'Shamrock',
      rgb: '(69, 206, 162)',
    },
    {
      hex: '#FB7EFD',
      name: 'Shocking Pink',
      rgb: '(251, 126, 253)',
    },
    {
      hex: '#CDC5C2',
      name: 'Silver',
      rgb: '(205, 197, 194)',
    },
    {
      hex: '#80DAEB',
      name: 'Sky Blue',
      rgb: '(128, 218, 235)',
    },
    {
      hex: '#ECEABE',
      name: 'Spring Green',
      rgb: '(236, 234, 190)',
    },
    {
      hex: '#FFCF48',
      name: 'Sunglow',
      rgb: '(255, 207, 72)',
    },
    {
      hex: '#FD5E53',
      name: 'Sunset Orange',
      rgb: '(253, 94, 83)',
    },
    {
      hex: '#FAA76C',
      name: 'Tan',
      rgb: '(250, 167, 108)',
    },
    {
      hex: '#18A7B5',
      name: 'Teal Blue',
      rgb: '(24, 167, 181)',
    },
    {
      hex: '#EBC7DF',
      name: 'Thistle',
      rgb: '(235, 199, 223)',
    },
    {
      hex: '#FC89AC',
      name: 'Tickle Me Pink',
      rgb: '(252, 137, 172)',
    },
    {
      hex: '#DBD7D2',
      name: 'Timberwolf',
      rgb: '(219, 215, 210)',
    },
    {
      hex: '#17806D',
      name: 'Tropical Rain Forest',
      rgb: '(23, 128, 109)',
    },
    {
      hex: '#DEAA88',
      name: 'Tumbleweed',
      rgb: '(222, 170, 136)',
    },
    {
      hex: '#77DDE7',
      name: 'Turquoise Blue',
      rgb: '(119, 221, 231)',
    },
    {
      hex: '#FFFF66',
      name: 'Unmellow Yellow',
      rgb: '(255, 255, 102)',
    },
    {
      hex: '#926EAE',
      name: 'Violet (Purple)',
      rgb: '(146, 110, 174)',
    },
    {
      hex: '#324AB2',
      name: 'Violet Blue',
      rgb: '(50, 74, 178)',
    },
    {
      hex: '#F75394',
      name: 'Violet Red',
      rgb: '(247, 83, 148)',
    },
    {
      hex: '#FFA089',
      name: 'Vivid Tangerine',
      rgb: '(255, 160, 137)',
    },
    {
      hex: '#8F509D',
      name: 'Vivid Violet',
      rgb: '(143, 80, 157)',
    },
    {
      hex: '#FFFFFF',
      name: 'White',
      rgb: '(255, 255, 255)',
    },
    {
      hex: '#A2ADD0',
      name: 'Wild Blue Yonder',
      rgb: '(162, 173, 208)',
    },
    {
      hex: '#FF43A4',
      name: 'Wild Strawberry',
      rgb: '(255, 67, 164)',
    },
    {
      hex: '#FC6C85',
      name: 'Wild Watermelon',
      rgb: '(252, 108, 133)',
    },
    {
      hex: '#CDA4DE',
      name: 'Wisteria',
      rgb: '(205, 164, 222)',
    },
    {
      hex: '#FCE883',
      name: 'Yellow',
      rgb: '(252, 232, 131)',
    },
    {
      hex: '#C5E384',
      name: 'Yellow Green',
      rgb: '(197, 227, 132)',
    },
    {
      hex: '#FFAE42',
      name: 'Yellow Orange',
      rgb: '(255, 174, 66)',
    },
  ];

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
    slotMinTime: '07:00:00',
    slotMaxTime: '20:00:00',
    slotDuration: '00:15:00',
    slotLabelInterval: '00:15:00',
    slotLabelFormat: [{ hour: '2-digit', minute: '2-digit' }],
    dayHeaderFormat: {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      omitCommas: true,
    },
    //initialView: 'resourceTimeGridDay',
    initialView: 'resourceTimeGridWeek',
    datesAboveResources: true,
    initialEvents: INITIAL_EVENTS,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.openToolTipInfo.bind(this),//this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    //eventMouseEnter: this.openToolTipInfo.bind(this), //Abre el modal al ingrear el mouse en la cita
    //eventRender: function(){},
    //schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    schedulerLicenseKey: '0720429164-fcs-1668012642',
    resources: this.recuros, //this.getResources(this),
    events: this.citasAgenda,
    customButtons: {
      custom1: {
        text: 'SALIR',
        click: () => this.openModal(),
      },
      custom2: {
        text: 'AGENDAR',
        click: function () {},
        /*
        click: function() {
          alert('clicked custom button 2!');
        }*/
      },
      custom3: {
        text: 'BUSCAR',
      },
      custom4: {
        text: 'IMPRIMIR',
      },
      custom5: {
        text: 'CÓDIGO COLORES',
      },
    },
    buttonText: {
      prev: 'ATRAS',
      next: 'ADELANTE',
    },
    resourceLabelDidMount: function (arg) {
        arg.el.style.backgroundColor = arg.resource.extendedProps['colorB']; //'rgb(135, 169, 107)';
    },
    resourceOrder: 'noSala',
    dayMinWidth: 50,
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
        allDay: selectInfo.allDay,
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  prev() {
    let ct: string = atob(this.centroTrabajo || '{}');
    let centroTrabajo = ct;
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.prev();
    var fechaInicio: Date = calendarApi.getDate();
    var dias = 6;
    //fechaInicio.setDate(fechaInicio.getDate() - dias);
    var fechaFin: Date = calendarApi.getDate();
    fechaFin.setDate(fechaFin.getDate() + dias);
    this.getCitas(centroTrabajo, fechaInicio, fechaFin);
    calendarApi.render();
    /* console.log(fechaInicio, fechaFin);
     this.agendaService.ConsultarAgendaSecretariosAcuerdos(centroTrabajo,fechaInicio,fechaFin).subscribe(data => {
        console.log(data);
      }) */
  }
  next() {
    let ct: string = atob(this.centroTrabajo || '{}');
    let centroTrabajo = ct;
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.next();
    var fechaInicio: Date = calendarApi.getDate();
    var dias = 6;
    //fechaInicio.setDate(fechaInicio.getDate() - dias);
    var fechaFin: Date = calendarApi.getDate();
    fechaFin.setDate(fechaFin.getDate() + dias);
    this.getCitas(centroTrabajo, fechaInicio, fechaFin);
    /*  console.log(fechaInicio, fechaFin);
     this.agendaService.ConsultarAgendaSecretariosAcuerdos(centroTrabajo,fechaInicio,fechaFin).subscribe(data => {
        console.log(data);
      }) */
  }
  gotoDate(date: any) {
    let ct: string = atob(this.centroTrabajo || '{}');
    let centroTrabajo = ct;
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate(date.value);
    var fechaInicio: Date = calendarApi.getDate();
    var dias = 6;
    fechaInicio.setDate(fechaInicio.getDate() - (fechaInicio.getDay() - 1));
    var fechaFin: Date = calendarApi.getDate();
    fechaFin.setDate(fechaInicio.getDate() + dias);
    this.getCitas(centroTrabajo, fechaInicio, fechaFin);
    /* console.log(fechaInicio, fechaFin);
     this.agendaService.ConsultarAgendaSecretariosAcuerdos(centroTrabajo,fechaInicio,fechaFin).subscribe(data => {
        console.log(data);
      }) */
  }
  imprimir() {
    const dialogRef = this.dialog.open(ImprimirReporteComponent, {
      width: '550px',
      //data: {name: this.name, animal: this.animal}
    });
  }
  agendar() {
    alert('hola!');
    console.log('Click!');
  }
  openModal() {}
  handleClick(event: Event) {
    console.log('Click!', event);
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
  constructor(
    private route: ActivatedRoute,
    public agendaService: AgendaService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {
    //this.inicializarAgenda();
    //this.loadResource();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AgendarComponent, {
      width: '550px',
      //data: {name: this.name, animal: this.animal}
    });
  }

  salir(): void {
    let message = 'Saliendo';
    window.parent.postMessage(message, '*');
  }

  openToolTipInfo(clickInfo: EventClickArg): void {
    const dialogRef = this.dialog.open(DatosAudienciaComponent, {
      width: '550px',
      data: clickInfo.event.extendedProps
    });
    //alert(clickInfo.event.title)
    clickInfo.event.backgroundColor;
    console.log(clickInfo.event.title);
  }

  
  getCitas(centroTrabajo, fechaInicio, fechaFin): void {
    this.citasAgenda = [];

    // fechaInicio = new Date();
    // fechaFin = new Date();
    this.spinner.show();
    this.agendaService
      .ConsultarAgendaSecretariosAcuerdos(centroTrabajo, fechaInicio, fechaFin)
      .subscribe(
        (
          data //this.citas = data
        ) => {
          this.citas = data;
          data.forEach((d) => {
            data = {
              start: d.fechaInicio,
              end: d.fechaFinal,
              resourceId: String(d.idSala),
              title: d.numeroExpediente + ' ' + d.tipoExpedienteDescripcion,
              backgroundColor: String(d.color),
              extendedProps: d
            };
            this.citasAgenda.push(data);
          });

          this.calendarOptions.events = this.citasAgenda;
          this.spinner.hide();
        }
      );
  }
  ngOnInit() {
    this.centroTrabajo = this.route.snapshot.paramMap.get('centroTrabajo');
    this.privilegio = this.route.snapshot.paramMap.get('privilegio');
    this.vista = this.route.snapshot.paramMap.get('vista');
    this.origen = this.route.snapshot.paramMap.get('origen');
    this.audiencia = '';
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

    let aud: string = this.audiencia || '{}';

    if (priv == '95' || priv == '100' || priv == '101' || priv == '301') {
      this.tiposAgenda = [
        { value: '3', viewValue: 'PERSONAL' },
        { value: '4', viewValue: 'GENERAL' },
      ];
    } else {
      this.tiposAgenda = [
        { value: '1', viewValue: 'GENERAL' },
        { value: '2', viewValue: 'CONCILIADOR' },
      ];
    }
    if (
      vis == 'Informativa' &&
      (priv == '94' ||
        priv == '96' ||
        priv == '98' ||
        priv == '100' ||
        priv == '301' ||
        priv == '95' ||
        priv == '101')
    ) {
      //console.log ("Entra aquí");
      this.cmbTipoAgenda = true;
    }
    //Mostrar btn aggendar
    if (vis == 'Informativa' && priv == '94') {
      this.isButtonVisible = true;
    }

    window.addEventListener(
      'message',
      function (e) {
        var origin = e.origin;
        var data = e.data;

        // P R O D U C C I O N
        if (origin !== 'https://plataforma.poderjudicial-gto.gob.mx') return;
        if (data !== null) {
          this.lblInfoGen = true;
          var informacion = JSON.parse(data);
          var info_Expediente = informacion.Informacion;
          var result = obtenerInfoPendiente(info_Expediente);
          // M O S T R A R  L E Y E N D A  C O N C I L I A D O R
          /* var aud = informacion.IdentificadorAudiencia;
          var result2 = obtenerCita(aud) */
        }
        // P R O D U C C I O N
      },
      false
    );

    const obtenerInfoPendiente = (info_Expediente) => {
      this.lblinfo_Expediente1 = info_Expediente;
      //console.log(this.lblinfo_Expediente1)
    };
    const obtenerCita = (aud) => {};
    //console.log(aud);

    if (vis == 'conciliador') {
      console.log('Es conciliador');
      this.lblinfo_Expediente1 = 'LA AUDIENCIA INICIA: 10:15 AM';
      //var strCita = this.obtenerCita(aud);
    }

    const ObtenerTipoSala = (idSala, salaNombre) => {
      //console.log(idSala, salaNombre)
      this.sala = salaNombre;
      //var recursoNombre = this.getResources(this.sala)
      //console.log(this.sala);
    };

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
    this.agendaService.ConsultarTiposSalas(centroTrabajo).subscribe((data) => {
      var i : number = 0;
      data.forEach((d) => {
        const str = String(d.idSala);

        this.recuros.push({
          id: d.idSala,
          title: d.salaNombre,
          colorB: this.colores[i].hex,
          noSala: i
        });
        
        i++;

        return data;
      });

      //console.log(data);
    });

    var fechaInicio: Date = new Date();
    var dias = 6;
    fechaInicio.setDate(fechaInicio.getDate() - (fechaInicio.getDay() - 1));
    var fechaFin: Date = new Date();
    fechaFin.setDate(fechaInicio.getDate() + dias);

    this.getCitas(centroTrabajo, fechaInicio, fechaFin);

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
