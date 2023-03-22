import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app/app-routing.module';
import { AppComponent } from './app.component';
import { AgendarPendientesComponent } from './components/agendar-pendientes/agendar-pendientes.component';
 
// import modules
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
 
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
import { NgxSpinnerModule } from 'ngx-spinner';
import { OverlayModule } from '@angular/cdk/overlay';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";


//Services
import { AgendaService } from '././services/agenda/agenda.service';
import { ImprimirReporteComponent } from './components/imprimir-reporte/imprimir-reporte.component';
import { IndiceComponent } from './components/indice/indice.component';
import { AudienciasSalaComponent } from './components/audiencias-sala/audiencias-sala.component';
import { AuthInterceptor } from './Tools/auth-interceptor';
import { AgendaComponent } from './components/agenda/agenda.component';
import { AgendarPendientesSecConciliadorComponent } from './components/agendar-pendientes-sec-conciliador/agendar-pendientes-sec-conciliador.component';

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
    ImprimirReporteComponent,
    IndiceComponent,
    AudienciasSalaComponent,
    AgendarPendientesComponent,
    AgendarPendientesSecConciliadorComponent,
  ],
  imports: [
    BrowserModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    OverlayModule,
    AppRoutingModule, 
    NgxSpinnerModule,
    RouterModule.forRoot([
      {path: 'Agenda', loadChildren: () => import('./components/agenda/agenda.module').then(m => m.AgendaModule)},
    ]),
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule
   
  ],
  entryComponents: [
    AgendarPendientesComponent
  ],
  providers: [
    AgendaComponent,
    AgendaService, 
    {provide: MAT_DATE_LOCALE, useValue: 'es'}
    , { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  
})
 
export class AppModule { }