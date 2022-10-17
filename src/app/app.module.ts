import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from './app.component';
 
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';
//import { AgendarComponent } from './components/agendar/agendar.component';
//import { AgendaComponent } from './components/agenda/agenda.component';
//import { TooltipColoresComponent } from './components/tooltip-colores/tooltip-colores.component';
//import { CustomTooltipColoresDirective } from './directives/custom-tooltip-colores.directive';
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
    AppComponent,
    //CustomTooltipColoresDirective,
  ],
  imports: [
    BrowserModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    OverlayModule,
    AppRoutingModule, 
    //RouterModule
    RouterModule.forRoot([
      {path: 'Agenda', loadChildren: () => import('./components/agenda/agenda.module').then(m => m.AgendaModule)},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
 
export class AppModule { }