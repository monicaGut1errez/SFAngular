import { Component } from '@angular/core';
import { environment, ServerLocal } from './../environments/environment';

/*import { HttpClient } from '@angular/common/http';
import { CalendarOptions,  DateSelectArg, EventClickArg, EventApi, Calendar, FullCalendarComponent } from '@fullcalendar/angular';
import { INITIAL_EVENTS,createEventId }  from './event-utils';
import esLocale from '@fullcalendar/core/locales/es';
import { ThisReceiver } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { TooltipColoresComponent } from './components/tooltip-colores/tooltip-colores.component';


import { AgendarComponent } from 'src/app/components/agendar/agendar.component';

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
];*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor() {
    console.log(environment.production); // Logs false for default environment
  }
title = "SIGOFAM";
}

  /*dataSource = ELEMENT_DATA;

  tooltipComponent = TooltipColoresComponent;
 
  tiposAgenda: TipoAgenda[] = [
    {value: '0', viewValue: 'GENERAL'},
    {value: '1', viewValue: 'CONCILIADOR'}
    ];

  Events = [];
  calendarOptions: CalendarOptions = {
    locale: esLocale,
    //themeSystem: 'bootstrap5',
    headerToolbar: false,*/
    /*headerToolbar: {
      //: 'prev,next today',
      left: 'custom1,custom5',
      right: 'custom2,prev,next,custom3,custom4'
    },*/
    /* footerToolbar: {
      right: 'prev,next'
    }, */
    /*allDaySlot: false,
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
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    resources: [
      { id: '1', title: ' 1 ', eventBackgroundColor: 'rgb(205, 149, 117)'},
      { id: '2', title: ' 2 ', eventBackgroundColor: 'rgb(135, 169, 107)'}
    ],
    events: [
      {
        id: '1',
        resourceId: '1',
        start: '2022-09-29 10:00:00',
        end: '2022-09-29 12:00:00',
        title: 'Prueba1'
      }, {
        id: '2',
        resourceId: '2',
        start: '2022-09-29 11:00:00',
        end: '2022-09-29 14:30:00',
        title: 'Prueba2'
      }, {
        id: '3',
        resourceId: '2',
        start: '2022-10-03 08:30:00',
        end: '2022-10-03 12:00:00',
        title: 'Prueba3'
      }
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
    businessHours: {
      daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
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

  }

  /* nextMonth(): void {
    console.warn('nextMonth');
    this.calendarApi = this.calendarComponent.getApi();
    this.calendarApi.next();
} */
  /*next() : void{
    //this.calendarOptions.next();
  }
  imprimir(){
    
  }
  agendar(){
    alert('hola!');
    console.log('Click!') 
  }
  openModal(){
  }
  handleClick(event: Event) { 
    console.log('Click!', event) 
  }*/

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
    /*constructor(public dialog: MatDialog) { }

    openDialog(): void {
      const dialogRef = this.dialog.open(AgendarComponent, {
        width: '550px',
        //data: {name: this.name, animal: this.animal}
      });
    }    
}*/
