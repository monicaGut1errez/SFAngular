import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerLocal } from 'src/environments/environment'
import { DateSelectionModelChange } from '@angular/material/datepicker';

const HTTPOPTIONS = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      
  })
};

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  strApi = '/api/Agenda';
  strApiAudiencia = '/api/Audiencia';

  constructor(private http: HttpClient) { }

  getUsers() {
    this.http.get("https://reqres.in/api/users?page=2").subscribe(data1 => {
      console.log(data1);
    });}
  
  ConsultarAgendaConciliadores(){
    
  }

  ConsultarAgendaConciliadoresSecretario(){

  }

  ConsultarConciliadoresLibres(){

  }

  ConsultarTiposSalasConciliador(){

  }

  ConsultarTiposSalas(): Observable<any>{
    return this.http.get(ServerLocal + this.strApi + '/ConsultarTiposSalas',HTTPOPTIONS);
  }

  ConsultarAuxiliaresAudienciaLibres(){

  }

  ConsultarAgendaJueces(){

  }

  ConsultarAgendaSecretariosAcuerdos(){

  }

  ConsultarAgendaAuxiliaresAudiencia(){

  }

  ConsultarAgendaAtencionApoyo(){

  }

  ConsultarFechasInhabiles(/*centroTrabajo: string, fechaInicio: string, fechaFin: string*/){
    this.http.get(ServerLocal + this.strApi +'/ConsultarFechasInhabiles/', /* + centroTrabajo + '/' + fechaInicio + '/' + fechaFin, */ HTTPOPTIONS).subscribe(data => {
      console.log(data);
    });
  }

  ConsultarDetalleAudienciaPrueba(){
    this.http.get(ServerLocal + this.strApiAudiencia +'/ConsultarDetalleAudiencia', /* + centroTrabajo + '/' + fechaInicio + '/' + fechaFin, */ HTTPOPTIONS).subscribe(data => {
      console.log(data);
    });
  }

  ConsultarDetalleAudiencia(): Observable<any>{
    return this.http.get(ServerLocal + this.strApiAudiencia +'/ConsultarDetalleAudiencia', /* + centroTrabajo + '/' + fechaInicio + '/' + fechaFin, */ HTTPOPTIONS);
  }


}
