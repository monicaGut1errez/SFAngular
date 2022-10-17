//import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//import { AppRoutingModule } from './app-routing.module';
import { AgendaComponent } from './agenda.component';
 
// import modules
//import { HttpClientModule } from '@angular/common/http';
 
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import adaptivePlugin from '@fullcalendar/adaptive'
import scrollgridPlugin from '@fullcalendar/scrollgrid'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { AgendarComponent } from 'src/app/components/agendar/agendar.component';
//import { TooltipColoresComponent } from 'src/app/components/tooltip-colores/tooltip-colores.component';
//import { CustomTooltipColoresDirective } from 'src/app/directives/custom-tooltip-colores.directive';
import { OverlayModule } from '@angular/cdk/overlay';
//import {MatButtonModule} from '@angular/material/button'; 


FullCalendarModule.registerPlugins([ 
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin,
  resourceTimeGridPlugin,
  adaptivePlugin,
  scrollgridPlugin,
  bootstrap5Plugin,
  ]);

@NgModule({
  exports: [
  ],
  declarations: [
    AgendaComponent,
    AgendarComponent,
    //CustomTooltipColoresDirective,
  ],
  imports: [
    //BrowserModule,
    FullCalendarModule,
    //BrowserAnimationsModule,
    DemoMaterialModule,
    OverlayModule,
    RouterModule
    //RouterModule.forRoot(AppRoutingModule),
    //MatButtonModule,
    //HttpClientModule    
  ],
  providers: [],
  //bootstrap: [AgendaComponent],
  
})
export class AgendaModule { }
